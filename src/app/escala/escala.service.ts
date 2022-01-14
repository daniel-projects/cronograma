import { Injectable } from '@angular/core';
import { Escala, Dia } from './escala';
import { Observable, of } from 'rxjs';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { switchMap, first } from 'rxjs/operators';
import { AtividadeService } from '../atividade/atividade.service';
import { TrabalhadorService } from '../trabalhador/trabalhador.service';
import { Atividade } from '../atividade/atividade';
import { Trabalhador } from '../trabalhador/trabalhador';

@Injectable({
  providedIn: 'root'
})
export class EscalaService {
  collectionPath = "escalas";

  items: Observable<Escala[]>;
  constructor(
    private afs: AngularFirestore,
    private atividadeService: AtividadeService,
    private trabalhadorService: TrabalhadorService
  ) {}

  async calcularEscala(escala: Escala): Promise<Escala> {
    let disponiveis = await this.trabalhadorService.$data.pipe(first()).toPromise();
    console.log(disponiveis);
    disponiveis = disponiveis.map(
      d => {
        d["numVezesSemana"] = 0;
        return d;
      }
    );
    escala.dias.map(
      dia => {
        dia.atividades.map(
          atividade => {
            for (let i = 0; i < atividade.quantidade; i++) {
              const trabalhador = this.calcularTrabalhador(disponiveis, atividade.atividade, dia.data);
              atividade.trabalhadores.push(trabalhador);
              disponiveis = this.removerTrabalhador(disponiveis, trabalhador, dia.data);
            }
            return atividade;
          }
        );
        return dia;
      }
    )
    return escala;

  }
  
  private calcularTrabalhador(disp: Trabalhador[], atividade: Atividade, data: string) {
    const disponiveis = this.shuffle(disp);
    return = disponiveis.reduce(
      (trabalhador: Trabalhador, novoTrabalhador: Trabalhador) => {
        if (trabalhador && !trabalhador.numVezesEscalado) {
          trabalhador.numVezesEscalado = 0;
        }
        if (novoTrabalhador && !novoTrabalhador.numVezesEscalado) {
          novoTrabalhador.numVezesEscalado = 0;
        }
        if (
          (novoTrabalhador.atividades.some(a => atividade.id === a.atividade.id && a.status))
          && 
          (novoTrabalhador.datas.some(d => d.data === data && d.status))
          &&
          (novoTrabalhador["numVezesSemana"] < 2)
          &&
          (novoTrabalhador.numVezesEscalado <= trabalhador.numVezesEscalado || !trabalhador)
        ) 

        {
          return novoTrabalhador;
        } else {
          return trabalhador;
        }
      }, 0
    )
  }
  
  private removerTrabalhador(disponiveis: Trabalhador[], trabalhador: Trabalhador, data: string) {
    return disponiveis
    .map(
      disponivel => {
        if (disponivel.id == trabalhador.id) {
          disponivel.numVezesEscalado = disponivel.numVezesEscalado++;
          disponivel["numVezesSemana"] = disponivel["numVezesSemana"] + 1;
          disponivel.datas = disponivel.datas.filter(
            d => data !== d.data
          );
        }
        return disponivel;
      }
    )
  }

  async gerarEscala(dataIni: Date): Promise<Escala> {
    const escala = new Escala();
    const dataFim = new Date(dataIni);
    dataFim.setDate(dataIni.getDate() + 6);
    console.log(dataFim);
    escala.dataIni = dataIni.toLocaleString('pt-BR').substr(0,10);
    escala.dataFim = dataFim.toLocaleString('pt-BR').substr(0,10);
    const atividades = await this.atividadeService.$data.pipe(first()).toPromise();
    [1, 3, 6].forEach(
      diaNum => {
        const dataDia = new Date(dataIni);
        dataDia.setDate(dataIni.getDate() + diaNum);
        const dia = new Dia();
        dia.id = diaNum;
        dia.data = dataDia.toLocaleString('pt-BR').substr(0,10);
        dia.atividades = atividades
        .map(
          a => {
            return {
              atividade: a,
              quantidade: a.dias.includes(dia.id) ? a.quantidade: 0,
              trabalhadores: []
            }
          }
        )
        .filter(
          a => a.quantidade > 0
        );
        escala.dias.push({...dia});
      } 
    )
    return escala;
  }

  get $data(): Observable<Escala[]> {
    return this.afs.collection<Escala>(this.collectionPath).valueChanges({ idField: 'id' });
  }

  public getById(id: string): Observable<Escala> {
    return this.afs.doc<any>(`${this.collectionPath}/${id}`).valueChanges().pipe(
      switchMap( doc => {
        return of({ id, ...doc });
      })
    );
  }
  
  public async push(data: Escala): Promise<DocumentReference> {
    data.dias.forEach(
      dia => {
        dia.atividades.forEach(
          atividade => {
            atividade.trabalhadores.forEach(
              async trabalhador => {
                let id = trabalhador.id;
                if (id) {
                  await this.trabalhadorService.adicionarPresenca(id, 1);
                }
              }
            )
          }
        )
      }
    )
    return this.afs.collection<Escala>(this.collectionPath).add({...data});
  }

  public async remove(id: string): Promise<void> {
    let escala = await this.getById(id).pipe(first()).toPromise();
    escala.dias.forEach(
      dia => {
        dia.atividades.forEach(
          atividade => {
            atividade.trabalhadores.forEach(
              async trabalhador => {
                let id = trabalhador.id;
                if (id) {
                  await this.trabalhadorService.adicionarPresenca(id, -1);
                }
              }
            )
          }
        )
      }
    )
    return this.afs.doc<Escala>(`${this.collectionPath}/${id}`).delete();
  }

  public set(id: string, data: Escala): Promise<void> {
    return this.afs.doc<Escala>(`${this.collectionPath}/${id}`).set(data);
  }

  public update(id: string, data: Escala): Promise<void> {
    return this.afs.doc<Escala>(`${this.collectionPath}/${id}`).update(data);
  }

  private shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }
}

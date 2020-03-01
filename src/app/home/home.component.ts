import { Component } from '@angular/core';
import { Trabalhador } from '../trabalhador/trabalhador';
import { TrabalhadorService } from '../trabalhador/trabalhador.service';
import { first } from 'rxjs/operators';

export class Escala {
  dia: string;
  data: string;
  atividade: string;
  trabalhador: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  colunas: string[] = ['dia','data','atividade','trabalhador'];
  escala: Escala[];
  trabalhadores: Trabalhador[] = [];

  constructor(
    private trabalhadorService: TrabalhadorService
  ) {
    this.trabalhadorService.$data.pipe(first()).toPromise().then(
      data => {
        this.trabalhadores = data
      }
    )
  }
  
   calcularSemanas() {
    const nTrabalhadores = this.trabalhadores.length * 2;
    let nAtividades = 0;
    const chaves = Object.keys(semana);
    chaves.forEach(
      dia => {
        const chaves = Object.keys(semana[dia]);
        chaves.forEach(
          chave => nAtividades += semana[dia][chave]
        ) 
      }
    )
    let nSemanas = 1;
    while(true) {
      const nS = nTrabalhadores * nSemanas % nAtividades;
      if (nS <= 2) {
        return nSemanas;
      }
      nSemanas++;
    }
  }
  
   shuffle(array) {
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
  
   calcularTrabalhador(disp, atividade, data) {
    const disponiveis = this.shuffle(disp);
    return disponiveis.reduce(
      (trabalhador, novoTrabalhador) => {
        const datas = novoTrabalhador.datas.filter(
          e => data === e.data 
        );
        if (
          novoTrabalhador.atividades[atividade] == true 
          && datas.length > 0
          && ( !data.numVezes || data.numVezes < 2 )
        )  {
          return novoTrabalhador;
        } else {
          return trabalhador;
        }
      }, 0
    )
  }
  
   removerTrabalhador(disponiveis, trabalhador, data) {
    return disponiveis
    .map(
      disponivel => {
        if (disponivel.nome == trabalhador) {
          disponivel.numVezes = disponivel.numVezes? disponivel.numVezes + 1 : 1;
          disponivel.datas = disponivel.datas.filter(
            e => data !== e.data
          );
        }
        return disponivel;
      }
    )
  }
  
   calcularEscala() {
    const numSemanas = this.calcularSemanas();
    const datas = ['29/02/2020', '02/03/2020', '04/03/2020'];
    
    let disponiveis = this.trabalhadores;
    console.log(this.trabalhadores);
    const escala = [];
    for (let i = 0; i < numSemanas; i++) {
      const chaves = Object.keys(semana);
      chaves.forEach(
        dia => {
          const data = datas.shift();
          const chaves = Object.keys(semana[dia]);
          chaves.forEach(
            chave => {
              const nAtividades = semana[dia][chave];
              if (nAtividades == 0 ) {
                return;
              }
              for (let i = 0; i < nAtividades; i++) {
                let trabalhador = this.calcularTrabalhador(disponiveis, chave, data).nome;
                escala.push({
                  dia: dia,
                  data: data,
                  atividade: chave,
                  trabalhador: trabalhador
                });
                disponiveis = this.removerTrabalhador(disponiveis, trabalhador, data);
              } 
            }
          ) 
        }
      )
    }
    return escala;
  } 

  public gerarEscala(){
    this.escala = this.calcularEscala();
  }

}


  const atividades = {
    CRISTAL: 'cristal',
    PASSE: 'passe',
    APOMETRIA: 'apometria',
    ESTUDO: 'estudo'
  }
  
  const semana = {
    segunda: {
      CRISTAL: 0,
      APOMETRIA: 4,
      PASSE: 0,
      ESTUDO: 0
    },
    quarta: {
      CRISTAL: 4,
      APOMETRIA: 0,
      PASSE: 3,
      ESTUDO: 1
    },
    sabado: {
      CRISTAL: 4,
      APOMETRIA: 0,
      PASSE: 3,
      ESTUDO: 1
    }
  }
  
  const trabalhadores = [
    {
      nome: 'Luciana',
      atividades: {
        CRISTAL: true,
        PASSE: true,
        APOMETRIA: true,
        ESTUDO: true
      }
    },
    {
      nome: 'Caroline',
      atividades: {
        CRISTAL: true,
        PASSE: true,
        APOMETRIA: true,
        ESTUDO: true
      }
    },
    {
      nome: 'Jean',
      atividades: {
        CRISTAL: true,
        PASSE: true,
        APOMETRIA: true,
        ESTUDO: true
      }
    },
    {
      nome: 'Dinamar',
      atividades: {
        CRISTAL: true,
        PASSE: true,
        APOMETRIA: true,
        ESTUDO: true
      }
    },
    {
      nome: 'Rosangela',
      atividades: {
        CRISTAL: true,
        PASSE: true,
        APOMETRIA: true,
        ESTUDO: true
      }
    },
    {
      nome: 'M. Cristina',
      atividades: {
        CRISTAL: true,
        PASSE: true,
        APOMETRIA: true,
        ESTUDO: true
      }
    },
    {
      nome: 'Andreia',
      atividades: {
        CRISTAL: true,
        PASSE: true,
        APOMETRIA: true,
        ESTUDO: true
      }
    },
    {
      nome: 'Edriane',
      atividades: {
        CRISTAL: true,
        PASSE: true,
        APOMETRIA: true,
        ESTUDO: true
      }
    },
    {
      nome: 'Juliano',
      atividades: {
        CRISTAL: true,
        PASSE: true,
        APOMETRIA: true,
        ESTUDO: true
      }
    },
    {
      nome: 'Suzana',
      atividades: {
        CRISTAL: true,
        PASSE: true,
        APOMETRIA: true,
        ESTUDO: true
      }
    },
    {
      nome: 'Eliane',
      atividades: {
        CRISTAL: true,
        PASSE: true,
        APOMETRIA: true,
        ESTUDO: true
      }
    },
    {
      nome: 'Irineu',
      atividades: {
        CRISTAL: true,
        PASSE: true,
        APOMETRIA: false,
        ESTUDO: true
      }
    },
    {
      nome: 'Felipe',
      atividades: {
        CRISTAL: true,
        PASSE: true,
        APOMETRIA: false,
        ESTUDO: false
      }
    },
    {
      nome: 'Marza',
      atividades: {
        CRISTAL: false,
        PASSE: true,
        APOMETRIA: false,
        ESTUDO: false
      }
    },
    {
      nome: 'Isadora',
      atividades: {
        CRISTAL: false,
        PASSE: true,
        APOMETRIA: false,
        ESTUDO: false
      }
    }
  ];
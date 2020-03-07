import { Component, OnInit } from '@angular/core';
import { Trabalhador } from '../trabalhador';
import { ActivatedRoute, Router } from '@angular/router';
import { TrabalhadorService } from '../trabalhador.service';
import { AtividadeService } from 'src/app/atividade/atividade.service';
import { Atividade } from 'src/app/atividade/atividade';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  id: string;
  trabalhador: Trabalhador;
  atividades: Array<{atividade:Atividade, status: boolean}>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private trabalhadorService: TrabalhadorService,
    private atividadeService: AtividadeService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.atividadeService.$data.subscribe(
      data => {
        this.atividades = data.map(
          atividade => {
            return {atividade, status: false}
          }
        )
      }
    );
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.id) {
      this.trabalhadorService.getById(this.id).subscribe(
        data => {
          this.trabalhador = data;
          this.atividadeService.$data.subscribe(
            data => {
              this.trabalhador.atividades = data.map(
                atividade => {
                  return {
                    atividade,
                    status: this.trabalhador.atividades.some(a => atividade.id === a.atividade.id && a.status)
                  }
                }
              )
            }
          );
        }
      )
    } else {
      this.trabalhador = new Trabalhador();
      this.atividadeService.$data.subscribe(
        data => {
          this.trabalhador.atividades = data.map(
            atividade => {
              return {atividade, status: false};
            }
          )
        }
      );
    }
  }

  async gravar() {
    console.log(this.trabalhador);
    if (this.id) {
      await this.trabalhadorService.update(this.id, this.trabalhador);
    } else {
      await this.trabalhadorService.push(this.trabalhador);
    }
    this.router.navigate(['trabalhador']);
  }

}

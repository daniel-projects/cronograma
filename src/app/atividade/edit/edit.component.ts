import { Component, OnInit } from '@angular/core';
import { Atividade } from '../atividade';
import { ActivatedRoute, Router } from '@angular/router';
import { AtividadeService } from '../atividade.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id: string;
  atividade: Atividade;
  diasSemana = [
    {num: 1, nome: "SEG", status: false},
    {num: 3, nome: "QUA", status: false},
    {num: 6, nome: "SAB", status: false}
  ]

  constructor(
    private activatedRoute: ActivatedRoute,
    private atividadeService: AtividadeService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.id) {
      this.atividadeService.getById(this.id).subscribe(
        data => {
          this.atividade = data;
          this.diasSemana = this.diasSemana.map(
            dia => {
              dia.status = this.atividade.dias.includes(dia.num);
              return dia;
            }
          )
        }
      )
    } else {
      this.atividade = new Atividade();
    }
  }

  async gravar() {
    this.atividade.dias = this.diasSemana
    .filter(
      d => d.status
    )
    .map(
      d => d.num
    );
    if (this.id) {
      await this.atividadeService.update(this.id, this.atividade);
    } else {
      await this.atividadeService.push(this.atividade);
    }
    this.router.navigate(['atividade']);
  }

}

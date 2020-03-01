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
        }
      )
    } else {
      this.atividade = new Atividade();
    }
  }

  async gravar() {
    console.log(this.atividade);
    if (this.id) {
      await this.atividadeService.update(this.id, this.atividade);
    } else {
      await this.atividadeService.push(this.atividade);
    }
    this.router.navigate(['atividade']);
  }

}

import { Component, OnInit } from '@angular/core';
import { Trabalhador } from '../trabalhador';
import { ActivatedRoute, Router } from '@angular/router';
import { TrabalhadorService } from '../trabalhador.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  id: string;
  trabalhador: Trabalhador;

  constructor(
    private activatedRoute: ActivatedRoute,
    private trabalhadorService: TrabalhadorService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.id) {
      this.trabalhadorService.getById(this.id).subscribe(
        data => {
          this.trabalhador = data;
        }
      )
    } else {
      this.trabalhador = new Trabalhador();
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

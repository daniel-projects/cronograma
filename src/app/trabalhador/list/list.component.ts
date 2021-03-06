import { Component, OnInit } from '@angular/core';
import { TrabalhadorService } from '../trabalhador.service';
import { Trabalhador } from '../trabalhador';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  lista: Trabalhador[] = [];
  colunas: string[] = ['nome', 'numVezesEscalado', 'acoes'];
  constructor(
    private trabalhadorService: TrabalhadorService
  ) {
    this.trabalhadorService.$data.subscribe(
      data => {
        this.lista = data
      }
    );
  }

  ngOnInit() {}

  addPresenca(id, numVezesEscalado) {
    this.trabalhadorService.adicionarPresenca(id, numVezesEscalado);
  }

  excluir(id: string) {
    this.trabalhadorService.remove(id);
  }

}

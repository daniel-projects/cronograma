import { Component, OnInit } from '@angular/core';
import { Atividade } from '../atividade';
import { AtividadeService } from '../atividade.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  lista: Atividade[] = [];
  colunas: string[] = ['descricao', 'acoes'];
  constructor(
    private atividadeService: AtividadeService
  ) {
    this.atividadeService.$data.subscribe(
      data => {
        this.lista = data
      }
    );
  }

  ngOnInit() {}

  excluir(id: string) {
    this.atividadeService.remove(id);
  }

}

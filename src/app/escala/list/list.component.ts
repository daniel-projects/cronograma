import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Escala } from '../escala';
import { EscalaService } from '../escala.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  lista: Escala[] = [];
  colunas: string[] = ['datas', 'acoes'];

  logado = false;

  constructor(
    private afAuth: AngularFireAuth,
    private escalaService: EscalaService
  ) { }

  ngOnInit() {
    this.escalaService.$data.subscribe(
      data => {
        this.lista = data
      }
    );
    this.afAuth.authState.subscribe(
      data => {
        this.logado = data !== null;
        console.log(data);
      }
    )
  }
  
  excluir(id: string) {
    this.escalaService.remove(id);
  }

}

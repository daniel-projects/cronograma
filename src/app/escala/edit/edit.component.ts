import { Component, OnInit } from '@angular/core';
import { EscalaService } from '../escala.service';
import { Escala } from '../escala';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  escala: Escala;
  escalaCalculada: Escala;
  dataIni: Date;

  constructor(
    private escalaService: EscalaService
  ) { }

  eDomingo(d: Date | null): boolean {
    const day = (d || new Date()).getDay();
    return day === 0;
  }

  async gerarEscala() {
    this.escala = await this.escalaService.gerarEscala(this.dataIni);
  }

  async calcularEscala() {
    this.escalaCalculada = await this.escalaService.calcularEscala(this.escala);
    console.log(this.escalaCalculada);
  }

  ngOnInit() {
    
  }

}

import { Atividade } from "../atividade/atividade";
import { Trabalhador } from "../trabalhador/trabalhador";

export class Escala {
  dias: Dia[];
  dataIni: string;
  dataFim: string;
  constructor() {
    this.dias = [];
  }
}

export class Dia {
  id: number;
  data: string;
  atividades: {
    atividade: Atividade,
    quantidade: number,
    trabalhadores?: Trabalhador[]
  }[];
}

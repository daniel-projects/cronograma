export class Trabalhador {
  id?: string;
  nome: string;
  atividades: Object;
  datas: Array<{data:string, dia:string, status: boolean}>;
  constructor() {
    this.atividades = {
      CRISTAL: false,
      PASSE: false,
      APOMETRIA: false,
      ESTUDO: false
    }
    this.datas = gerarDatas();
  }
}

function gerarDatas() {
  const nomeDias = {
    1: 'SEG',
    3: 'QUA',
    6: 'SAB'
  }
  const datas = [];
  const dataInicial = new Date();
  const ano = dataInicial.getFullYear();
  let novaData = dataInicial;
  const diasSemana = [1, 3, 6];
  while (novaData.getFullYear() == ano) {
    const dia = novaData.getDay();
    if (diasSemana.includes(dia)) {
      const data = novaData.toLocaleString('pb-BR').substr(0,10);
      datas.push({
        data,
        dia: nomeDias[dia],
        status: true
      });
    }
    novaData.setDate(novaData.getDate() + 1);
  }
  return datas;
}
export class Atributo {
  indice!: number;
  nombre!: string;
  valor: number = 0;

  constructor(indice:number, nombre: string, valor: number = 0) {
    this.nombre = nombre;
  }

}

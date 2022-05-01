import {Atributo} from "./Atributo";

export class MatrizComplejidad {
  nombre!: string;
  zonaBaja!: Atributo;
  zonaMedia!: Atributo;
  zonaAlta!: Atributo;

  constructor(nombre: string, zonaBaja: Atributo, zonaMedia: Atributo, zonaAlta: Atributo) {
    this.nombre = nombre;
    this.zonaBaja = zonaBaja;
    this.zonaMedia = zonaMedia;
    this.zonaAlta = zonaAlta;
  }
}

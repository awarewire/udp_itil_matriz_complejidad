import {Component, OnInit, ViewChild, ViewChildren} from '@angular/core';
import {MatrizComplejidad} from "../../_model/MatrizComplejidad";
import {Atributo} from "../../_model/Atributo";
import {ResultadoComponent} from "./resultado/resultado/resultado.component";

@Component({
  selector: 'app-matriz-complejidad',
  templateUrl: './matriz-complejidad.component.html',
  styleUrls: ['./matriz-complejidad.component.css']
})
export class MatrizComplejidadComponent implements OnInit {

  @ViewChild(ResultadoComponent)
  resultado!: ResultadoComponent;

  complejidadNegocio: Array<MatrizComplejidad> = [];
  complejidadTecnologica: Array<MatrizComplejidad> = [];

  arrayPuntosNegocio: any[] = [];
  arrayPuntosTecnologicos: any[] = [];


  totalPuntosNegocio: number = 0;
  totalPuntosTecnologicos: number = 0;

  constructor() {
    this.initComplejidadNegocio();
    this.initComplejidadTecnologica();
  }

  private initComplejidadNegocio(){
    let matrizComplejidad = this.addMatrizComplejidad(1,"Cuantos ejecutivos de la organización poseen conocimientos en esa rama del negocio",
      "Uno", "Entre 2 y 3", "Ninguno 4 o más");
    this.complejidadNegocio.push(matrizComplejidad);

    matrizComplejidad = this.addMatrizComplejidad(2, "Definición de objetivos del negocio",
      "Método SMART", "Método SMART, aplicado no en su totalidad", "Vagos");
    this.complejidadNegocio.push(matrizComplejidad);

    matrizComplejidad = this.addMatrizComplejidad(3, "Procesos de negocio",
      "Pocos (1 a 4)", "5 a 6", "Muchos, más de 6");
    this.complejidadNegocio.push(matrizComplejidad);

    matrizComplejidad = this.addMatrizComplejidad(4, "Políticas del negocio",
      "Existentes", "Vagas", "Inexistentes");
    this.complejidadNegocio.push(matrizComplejidad);

    matrizComplejidad = this.addMatrizComplejidad(5, "Regulaciones del negocio (Superintendencia o SII)",
      "Pocas y Simples", "Pocas y complejas", "Muchas y complejas");
    this.complejidadNegocio.push(matrizComplejidad);

    matrizComplejidad = this.addMatrizComplejidad(6, "Personal",
      "Experimentado", "Poca experiencia", "Sin experiencia");
    this.complejidadNegocio.push(matrizComplejidad);

    matrizComplejidad = this.addMatrizComplejidad(7,"Ámbito geográfico del negocio",
      "Una Localización", "Regional", "Global");
    this.complejidadNegocio.push(matrizComplejidad);

    matrizComplejidad = this.addMatrizComplejidad(8, "Reglas internas del negocio",
      "Establecidas", "Vagas", "Inexistentes");
    this.complejidadNegocio.push(matrizComplejidad);
  }

  private initComplejidadTecnologica(){
    let matrizComplejidad = this.addMatrizComplejidad(1,"Arquitectura tecnológica del proyecto",
      "Existe en la empresa", "Existe, pero no desarrolladas", "Inexistente en la empresa");
    this.complejidadTecnologica.push(matrizComplejidad);

    matrizComplejidad = this.addMatrizComplejidad(2,"Proveedores de Tecnología y telecomunicaciones",
      "Antiguos, con presencia de más 4 años en el mercado", "Antiguos, con presencia de menos de 4 años en el mercado", "Nuevos");
    this.complejidadTecnologica.push(matrizComplejidad);

    matrizComplejidad = this.addMatrizComplejidad(3,"Localización de los dispositivos a controlar",
      "Una", "Entre 3 y 4 localizaciones", "5 o más");
    this.complejidadTecnologica.push(matrizComplejidad);

    matrizComplejidad = this.addMatrizComplejidad(4,"Personal de áreas tecnológicas",
      "Experimentado, más de 2 anos.", "Menos de 2 años de experiencia", "Sin experiencia");
    this.complejidadTecnologica.push(matrizComplejidad);

    matrizComplejidad = this.addMatrizComplejidad(5,"Cantidad de plataformas",
      "Pocas (1 a 3)", "4", "Muchas (más de 4)");
    this.complejidadTecnologica.push(matrizComplejidad);

    matrizComplejidad = this.addMatrizComplejidad(6,"Nivel de integración de las distintas plataformas, actualmente",
      "Integradas", "Medianamente integradas", "Sin integración");
    this.complejidadTecnologica.push(matrizComplejidad);

    matrizComplejidad = this.addMatrizComplejidad(7,"Plataformas tolerantes a fallas o redundantes",
      "Muchas (Mayor a 70%)", "Entre 30% y 69% ", "Menos de 30%");
    this.complejidadTecnologica.push(matrizComplejidad);

    matrizComplejidad = this.addMatrizComplejidad(8,"Antigüedad de la tecnología (Obsolescencia)",
      "Menos de una año", "De 1 a 2 años", "Mas de 2 años");
    this.complejidadTecnologica.push(matrizComplejidad);
  }

  private addMatrizComplejidad(indice: number, nombre: string, zonaBaja: string, zonaMedia: string, zonaAlta:string): MatrizComplejidad{

    let atributoZonaBaja = new Atributo(indice, zonaBaja);
    let atributoZonaMedia = new Atributo(indice, zonaMedia);
    let atributoZonaAlta = new Atributo(indice, zonaAlta);
    return new MatrizComplejidad(nombre, atributoZonaBaja, atributoZonaMedia, atributoZonaAlta);

  }

  ngOnInit(): void {
  }
  ngAfterViewInit () {

  }

  generarArrayPuntos(arrayMatriz: Array<MatrizComplejidad>): number[]{
    let array: number[] = [];
    arrayMatriz.forEach(item => {
      if(item.zonaBaja.valor != 0){
        array.push(item.zonaBaja.valor);
      }
      else if(item.zonaMedia.valor != 0){
        array.push(item.zonaMedia.valor);
      }
      else if(item.zonaAlta.valor != 0){
        array.push(item.zonaAlta.valor);
      }
    });
    return array;
  }

  puntosNegocios($puntos: number) {
    this.totalPuntosNegocio = $puntos;
    this.arrayPuntosNegocio = this.generarArrayPuntos(this.complejidadNegocio);
    this.resultado.totalPuntosNegocio = this.totalPuntosNegocio;
    //this.resultado.arrayPuntosNegocio = this.arrayPuntosNegocio;
    this.resultado.totalPuntosNegocio = this.totalPuntosNegocio;
    this.resultado.init(this.arrayPuntosNegocio, true);
  }

  puntosTecnologicos($puntos: number) {
    this.totalPuntosTecnologicos= $puntos;
    this.arrayPuntosTecnologicos = this.generarArrayPuntos(this.complejidadTecnologica);
    this.resultado.totalPuntosTecnologicos = this.totalPuntosTecnologicos;
    this.resultado.arrayPuntosTecnologico = this.arrayPuntosTecnologicos;
    //this.resultado.dibujar();
    this.resultado.totalPuntosTecnologicos = this.totalPuntosTecnologicos;
    this.resultado.init(this.arrayPuntosTecnologicos, false);
  }

}

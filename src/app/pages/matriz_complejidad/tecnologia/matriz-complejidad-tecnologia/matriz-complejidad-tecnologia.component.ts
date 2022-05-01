import { Component, OnInit } from '@angular/core';
import {MatrizComplejidad} from "../../../../_model/MatrizComplejidad";
import {MatTableDataSource} from "@angular/material/table";
import {Atributo} from "../../../../_model/Atributo";

@Component({
  selector: 'app-matriz-complejidad-tecnologia',
  templateUrl: './matriz-complejidad-tecnologia.component.html',
  styleUrls: ['./matriz-complejidad-tecnologia.component.css']
})
export class MatrizComplejidadTecnologiaComponent implements OnInit {

  complejidadNegocio: Array<MatrizComplejidad> = [];

  displayedColumns = ['atributo-de-negocio', 'zona-I', 'zona-II', 'zona-III'];
  items = ['Item 1', 'Item 2', 'Item 3'];
  expandedIndex = 0;

  dataSource!: MatTableDataSource<MatrizComplejidad>;

  constructor() {

    let matrizComplejidad = this.addMatrizComplejidad("Arquitectura tecnológica del proyecto",
      "Existe en la empresa", "Existe, pero no desarrolladas", "Inexistente en la empresa");
    this.complejidadNegocio.push(matrizComplejidad);

    matrizComplejidad = this.addMatrizComplejidad("Proveedores de Tecnología y telecomunicaciones",
      "Antiguos, con presencia de más 4 años en el mercado", "Antiguos, con presencia de menos de 4 años en el mercado", "Nuevos");
    this.complejidadNegocio.push(matrizComplejidad);

    matrizComplejidad = this.addMatrizComplejidad("Localización de los dispositivos a controlar",
      "Una", "Entre 3 y 4 localizaciones", "5 o más");
    this.complejidadNegocio.push(matrizComplejidad);

    matrizComplejidad = this.addMatrizComplejidad("Personal de áreas tecnológicas",
      "Experimentado, más de 2 anos.", "Menos de 2 años de experiencia", "Sin experiencia");
    this.complejidadNegocio.push(matrizComplejidad);

    matrizComplejidad = this.addMatrizComplejidad("Cantidad de plataformas",
      "Pocas (1 a 3)", "4", "Muchas (más de 4)");
    this.complejidadNegocio.push(matrizComplejidad);

    matrizComplejidad = this.addMatrizComplejidad("Nivel de integración de las distintas plataformas, actualmente",
      "Integradas", "Medianamente integradas", "Sin integración");
    this.complejidadNegocio.push(matrizComplejidad);

    matrizComplejidad = this.addMatrizComplejidad("Plataformas tolerantes a fallas o redundantes",
      "Muchas (Mayor a 70%)", "Entre 30% y 69% ", "Menos de 30%");
    this.complejidadNegocio.push(matrizComplejidad);

    matrizComplejidad = this.addMatrizComplejidad("Antigüedad de la tecnología (Obsolescencia)",
      "Menos de una año", "De 1 a 2 años", "Mas de 2 años");
    this.complejidadNegocio.push(matrizComplejidad);

  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.complejidadNegocio);
  }

  addMatrizComplejidad(nombre: string, zonaBaja: string, zonaMedia: string, zonaAlta:string): MatrizComplejidad{

    let atributoZonaBaja = new Atributo(zonaBaja);
    let atributoZonaMedia = new Atributo(zonaMedia);
    let atributoZonaAlta = new Atributo(zonaAlta);

    return new MatrizComplejidad(nombre, atributoZonaBaja, atributoZonaMedia, atributoZonaAlta);

  }
}

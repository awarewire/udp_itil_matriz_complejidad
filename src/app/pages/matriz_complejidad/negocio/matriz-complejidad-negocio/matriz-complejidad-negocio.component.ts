import { Component, OnInit } from '@angular/core';
import {MatrizComplejidad} from "../../../../_model/MatrizComplejidad";
import {MatTableDataSource} from "@angular/material/table";
import {Atributo} from "../../../../_model/Atributo";

@Component({
  selector: 'app-matriz-complejidad-negocio',
  templateUrl: './matriz-complejidad-negocio.component.html',
  styleUrls: ['./matriz-complejidad-negocio.component.css']
})
export class MatrizComplejidadNegocioComponent implements OnInit {

  complejidadNegocio: Array<MatrizComplejidad> = [];

  displayedColumns = ['atributo-de-negocio', 'zona-I', 'zona-II', 'zona-III'];
  items = ['Item 1', 'Item 2', 'Item 3'];
  expandedIndex = 0;

  dataSource!: MatTableDataSource<MatrizComplejidad>;

  constructor() {

    let matrizComplejidad = this.addMatrizComplejidad("Cuantos ejecutivos de la organización poseen conocimientos en esa rama del negocio",
      "Uno", "Entre 2 y 3", "Ninguno 4 o más");
    this.complejidadNegocio.push(matrizComplejidad);

    matrizComplejidad = this.addMatrizComplejidad("Definición de objetivos del negocio",
      "Método SMART", "Método SMART, aplicado no en su totalidad", "Vagos");
    this.complejidadNegocio.push(matrizComplejidad);

    matrizComplejidad = this.addMatrizComplejidad("Procesos de negocio",
      "Pocos (1 a 4)", "5 a 6", "Muchos, más de 6");
    this.complejidadNegocio.push(matrizComplejidad);

    matrizComplejidad = this.addMatrizComplejidad("Políticas del negocio",
      "Existentes", "Vagas", "Inexistentes");
    this.complejidadNegocio.push(matrizComplejidad);

    matrizComplejidad = this.addMatrizComplejidad("Regulaciones del negocio (Superintendencia o SII)",
      "Pocas y Simples", "Pocas y complejas", "Muchas y complejas");
    this.complejidadNegocio.push(matrizComplejidad);

    matrizComplejidad = this.addMatrizComplejidad("Personal",
      "Experimentado", "Poca experiencia", "Sin experiencia");
    this.complejidadNegocio.push(matrizComplejidad);

    matrizComplejidad = this.addMatrizComplejidad("Ámbito geográfico del negocio",
      "Una Localización", "Regional", "Global");
    this.complejidadNegocio.push(matrizComplejidad);

    matrizComplejidad = this.addMatrizComplejidad("Reglas internas del negocio",
      "Establecidas", "Vagas", "Inexistentes");
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

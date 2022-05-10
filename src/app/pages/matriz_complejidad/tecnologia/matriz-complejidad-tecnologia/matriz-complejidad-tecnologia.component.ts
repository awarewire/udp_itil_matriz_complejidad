import {Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {MatrizComplejidad} from "../../../../_model/MatrizComplejidad";
import {MatTableDataSource} from "@angular/material/table";
import {Atributo} from "../../../../_model/Atributo";
import {MatSelect} from "@angular/material/select";
import {MatRadioButton} from "@angular/material/radio";

@Component({
  selector: 'app-matriz-complejidad-tecnologia',
  templateUrl: './matriz-complejidad-tecnologia.component.html',
  styleUrls: ['./matriz-complejidad-tecnologia.component.css']
})
export class MatrizComplejidadTecnologiaComponent implements OnInit {

  @ViewChildren("selectsZonaBaja") private selectsZonaBaja: QueryList<MatRadioButton> | undefined;
  @ViewChildren("selectsZonaMedia") private selectsZonaMedia: QueryList<MatRadioButton> | undefined;
  @ViewChildren("selectsZonaAlta") private selectsZonaAlta: QueryList<MatRadioButton> | undefined;

  @Input()
  complejidadTecnologica: Array<MatrizComplejidad> = [];

  @Output()
  emisor = new EventEmitter();

  displayedColumns = ['atributo-de-negocio', 'zona-I', 'zona-II', 'zona-III'];
  dataSource!: MatTableDataSource<MatrizComplejidad>;
  totalSumaZonaBaja: number = 0;
  totalSumaZonaMedia: number = 0;
  totalSumaZonaAlta: number = 0;
  totalPuntosTecnologicos: number = 0;

  constructor() {
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.complejidadTecnologica);
  }

  calcularSumaTotalZonaBaja() {
    let suma = 0;
    this.complejidadTecnologica.forEach(function(item) {
      suma = suma + Number(item.zonaBaja.valor);
    });
    this.totalSumaZonaBaja = suma;
    return this.totalSumaZonaBaja;
  }

  calcularSumaTotalZonaMedia() {
    let suma = 0;
    this.complejidadTecnologica.forEach((item) =>{
      suma = suma + Number(item.zonaMedia.valor);
    });
    this.totalSumaZonaMedia = suma;
    return this.totalSumaZonaMedia;
  }

  calcularSumaTotalZonaAlta() {
    let suma = 0;
    this.complejidadTecnologica.forEach((item) =>{
      suma = suma + Number(item.zonaAlta.valor);
    });
    this.totalSumaZonaAlta = suma;
    return this.totalSumaZonaAlta;
  }

  calcularSumaTotal(){
    this.totalPuntosTecnologicos = this.calcularSumaTotalZonaBaja() + this.calcularSumaTotalZonaMedia() + this.calcularSumaTotalZonaAlta();
    this.emisor.emit(this.totalPuntosTecnologicos);
    return this.totalPuntosTecnologicos;
  }

  onChange($event: any, $row: any) {
    console.log($event.source.id);
    this.selectsZonaBaja?.forEach((itemBaja)=>{
      let i = 0;
      if($event.source.id === itemBaja.id){
        let i = Number(($event.source.id).replace('mat-select-',''));
        //Tenemos que deseleccionar el combo 2 y 3
        let idSelect2 = 'mat-select-' + (i + 2);
        let idSelect3 = 'mat-select-' + (i + 4);
        this.selectsZonaMedia?.forEach(itemMedia => {
          if(idSelect2 === itemMedia.id) {
            itemMedia.value = null;
          }
        });
        this.selectsZonaAlta?.forEach(itemAlta => {
          if(idSelect3 === itemAlta.id) {
            itemAlta.value = null;
          }
        });
      }
      i++;
    });

    this.selectsZonaMedia?.forEach((itemMedia)=>{
      let i = 0;
      if($event.source.id === itemMedia.id){
        let i = Number(($event.source.id).replace('mat-select-',''));
        let idSelect2 = 'mat-select-' + (i - 2);
        let idSelect3 = 'mat-select-' + (i + 2);
        this.selectsZonaBaja?.forEach(itemBaja => {
          if(idSelect2 === itemBaja.id) {
            itemBaja.value = null;
          }
        });
        this.selectsZonaAlta?.forEach(itemAlta => {
          if(idSelect3 === itemAlta.id) {
            itemAlta.value = null;
          }
        });
      }
      i++;
    });

    this.selectsZonaAlta?.forEach((itemAlta)=>{
      let i = 0;
      if($event.source.id === itemAlta.id){
        let i = Number(($event.source.id).replace('mat-select-',''));
        let idSelect2 = 'mat-select-' + (i - 4);
        let idSelect3 = 'mat-select-' + (i - 2 );
        this.selectsZonaBaja?.forEach(itemBaja => {
          if(idSelect2 === itemBaja.id) {
            itemBaja.value = null;
          }
        });
        this.selectsZonaMedia?.forEach(itemMedia => {
          if(idSelect3 === itemMedia.id) {
            itemMedia.value = null;
          }
        });
      }
      i++;
    });

  }

  selectCheck($event: any, $filaMatrizComplejidad: MatrizComplejidad) {
    /*
    console.log('id', $event.source.id);
    console.log('value', $event.source.value);
    */

    this.zonaGroupDeselect($event.source.id, this.selectsZonaBaja,
      this.selectsZonaMedia, this.selectsZonaAlta, 2, 4);

    this.zonaGroupDeselect($event.source.id, this.selectsZonaMedia,
      this.selectsZonaBaja, this.selectsZonaAlta, -2, 2);

    this.zonaGroupDeselect($event.source.id, this.selectsZonaAlta,
      this.selectsZonaMedia, this.selectsZonaBaja, -2, -4);

    switch (Number($event.source.value)) {
      case 1:
        $filaMatrizComplejidad.zonaBaja.valor = $event.source.value
        $filaMatrizComplejidad.zonaMedia.valor = 0
        $filaMatrizComplejidad.zonaAlta.valor = 0
        break;
      case 2:
        $filaMatrizComplejidad.zonaBaja.valor = 0
        $filaMatrizComplejidad.zonaMedia.valor = $event.source.value
        $filaMatrizComplejidad.zonaAlta.valor = 0
        break;
      case 3:
        $filaMatrizComplejidad.zonaBaja.valor = 0
        $filaMatrizComplejidad.zonaMedia.valor = 0
        $filaMatrizComplejidad.zonaAlta.valor = $event.source.value
        break;
    }
    this.calcularSumaTotal();
  }

  private zonaGroupDeselect(idRadio: string, zona1: QueryList<MatRadioButton> | undefined, zona2: QueryList<MatRadioButton> | undefined,
                            zona3: QueryList<MatRadioButton> | undefined, incrementAux1: number, incrementAux2: number ){
    zona1?.forEach((itemRadio) => {
      let i = 0;
      if (idRadio === itemRadio.id) {
        let i = Number((idRadio).replace('mat-radio-',''));
        let aux1 = i + incrementAux1;
        let aux2 = i + incrementAux2;
        let idSelect2 = 'mat-radio-' + aux1;
        let idSelect3 = 'mat-radio-' + aux2;

        this.deselect(zona2, idSelect2);
        this.deselect(zona3, idSelect3);
      }
      i++;
    });

  }

  private deselect(arrayRadioButtons: QueryList<MatRadioButton> | undefined, identificador: string){
    arrayRadioButtons?.forEach(itemRadio => {
      if(identificador === itemRadio.id){
        itemRadio.checked = null;
      }
    });
  }


}

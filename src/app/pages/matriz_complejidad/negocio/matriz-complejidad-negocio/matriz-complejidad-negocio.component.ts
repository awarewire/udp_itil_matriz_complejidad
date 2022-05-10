import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {MatrizComplejidad} from "../../../../_model/MatrizComplejidad";
import {MatTableDataSource} from "@angular/material/table";
import {Atributo} from "../../../../_model/Atributo";
import {MatSelect} from "@angular/material/select";
import {MatRadioButton} from "@angular/material/radio";

@Component({
  selector: 'app-matriz-complejidad-negocio',
  templateUrl: './matriz-complejidad-negocio.component.html',
  styleUrls: ['./matriz-complejidad-negocio.component.css']
})
export class MatrizComplejidadNegocioComponent implements OnInit {

  @ViewChildren("selectsZonaBaja") private selectsZonaBaja: QueryList<MatRadioButton> | undefined;
  @ViewChildren("selectsZonaMedia") private selectsZonaMedia: QueryList<MatRadioButton> | undefined;
  @ViewChildren("selectsZonaAlta") private selectsZonaAlta: QueryList<MatRadioButton> | undefined;

  @Input()
  complejidadNegocio: Array<MatrizComplejidad> = [];
  @Output()
  emisor = new EventEmitter();

  displayedColumns = ['atributo-de-negocio', 'zona-I', 'zona-II', 'zona-III'];
  items = ['Item 1', 'Item 2', 'Item 3'];
  totalSumaZonaBaja: number = 0;
  totalSumaZonaMedia: number = 0;
  totalSumaZonaAlta: number = 0;
  totalPuntosNegocio: number = 0;

  dataSource!: MatTableDataSource<MatrizComplejidad>;

  constructor() {
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.complejidadNegocio);
  }

  calcularSumaTotalZonaBaja() {
    let suma = 0;
    this.complejidadNegocio.forEach(function(item) {
      suma = suma + Number(item.zonaBaja.valor);
    });
    this.totalSumaZonaBaja = suma;
    return this.totalSumaZonaBaja;
  }

  calcularSumaTotalZonaMedia() {
    let suma = 0;
    this.complejidadNegocio.forEach((item) =>{
      suma = suma + Number(item.zonaMedia.valor);
    });
    this.totalSumaZonaMedia = suma;
    return this.totalSumaZonaMedia;
  }

  calcularSumaTotalZonaAlta() {
    let suma = 0;
    this.complejidadNegocio.forEach((item) =>{
      suma = suma + Number(item.zonaAlta.valor);
    });
    this.totalSumaZonaAlta = suma;
    return this.totalSumaZonaAlta;
  }

  calcularSumaTotal(){
    this.totalPuntosNegocio = this.calcularSumaTotalZonaBaja() + this.calcularSumaTotalZonaMedia() + this.calcularSumaTotalZonaAlta();
    return this.totalPuntosNegocio;
  }

  selectCheck($event: any, $filaMatrizComplejidad: MatrizComplejidad) {
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
    this.emisor.emit(this.totalPuntosNegocio);
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

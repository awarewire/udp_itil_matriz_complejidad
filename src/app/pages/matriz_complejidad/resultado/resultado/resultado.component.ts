import {Component, ElementRef, Input, OnInit, QueryList, Renderer2, ViewChild, ViewChildren} from '@angular/core';
import { Chart } from 'chart.js';
import {MatrizComplejidad} from "../../../../_model/MatrizComplejidad";

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.css']
})
export class ResultadoComponent implements OnInit {

  @Input()
  complejidadNegocio: Array<MatrizComplejidad> = [];
  @Input()
  complejidadTecnologica: Array<MatrizComplejidad> = [];

  @Input()
  arrayPuntosNegocio: any = [];
  @Input()
  arrayPuntosTecnologico: any = [];

  @Input()
  totalPuntosNegocio: number = 0;
  @Input()
  totalPuntosTecnologicos: number = 0;


  @ViewChild("BB_B") BB_B!: ElementRef;
  @ViewChild("BM_M") BM_M!: ElementRef;
  @ViewChild("BA_A") BA_A!: ElementRef;

  @ViewChild("MB_M") MB_M!: ElementRef;
  @ViewChild("MM_M") MM_M!: ElementRef;
  @ViewChild("MA_A") MA_A!: ElementRef;

  @ViewChild("AB_A") AB_A!: ElementRef;
  @ViewChild("AM_A") AM_A!: ElementRef;
  @ViewChild("AA_A") AA_A!: ElementRef;


  public chartBarras: any;
  public chartLineas: any;
  public chartScatter: any;

  constructor(private elementRef: ElementRef, private renderer:Renderer2) {}

  ngOnInit(): void {
    this.dibujarGraficoDeDispersion();
    this.dibujarGraficoDeBarras();
    this.dibujarGraficoDeLineas();
  }

  init(arrayPuntos: number[], isNegocio: boolean = true){
    console.log('isNegocio:', isNegocio,'puntos:', arrayPuntos);
    if(isNegocio){
      this.arrayPuntosNegocio = arrayPuntos;
      console.log('total puntos de negocio', this.totalPuntosNegocio)
    }else{
      this.arrayPuntosTecnologico = arrayPuntos;
      console.log('total puntos de tecnologicos', this.totalPuntosTecnologicos)
    }

    this.encontrarCuadranteMatriz();

    console.log('totalPuntosNegocio',this.totalPuntosNegocio)
    this.dibujarGraficoDeBarras();
    this.dibujarGraficoDeLineas();
    this.dibujarGraficoDeDispersion();
  }

  private encontrarCuadranteMatriz():void{
    const BAJA = 'BAJA';
    const MEDIA = 'MEDIA';
    const ALTA = 'ALTA';

    let complejidadNegocio!: string;
    let complejidadTenologica!: string;
    let resultado!: string;
    let idComplejidadDOM!: string;

    //Preguntamos si estan respondidas todas las preguntas de negocio
    if(this.arrayPuntosNegocio.length === 8 && this.arrayPuntosTecnologico.length === 8){

      //Obtener el cuadrante de acuerdo al total de puntos respondidos
      console.log(this.totalPuntosNegocio, this.totalPuntosTecnologicos)
      if(this.totalPuntosNegocio<12 && this.totalPuntosNegocio>=8){
       //Es Baja
        console.log('Complejidad de negocio es BAJA');
        complejidadNegocio = BAJA;
      }else if(this.totalPuntosNegocio<=20 && this.totalPuntosNegocio>=12){
        //Es Media
        console.log('Complejidad de negocio es MEDIA');
        complejidadNegocio = MEDIA;
      }else if(this.totalPuntosNegocio<=24 && this.totalPuntosNegocio>20){
        //Es alta
        console.log('Complejidad de negocio es ALTA');
        complejidadNegocio = ALTA;
      }

      if(this.totalPuntosTecnologicos<12 && this.totalPuntosTecnologicos>=8){
        //Es Baja
        console.log('Complejidad tecnologica es BAJA');
        complejidadTenologica = BAJA;
      }else if(this.totalPuntosTecnologicos<=20 && this.totalPuntosTecnologicos>=12){
        //Es Media
        console.log('Complejidad tecnologica es MEDIA');
        complejidadTenologica = MEDIA;
      }else if(this.totalPuntosTecnologicos<=24 && this.totalPuntosTecnologicos>20){
        //Es alta
        console.log('Complejidad tecnologica es ALTA');
        complejidadTenologica = ALTA;
      }

      if(BAJA === complejidadTenologica && BAJA === complejidadNegocio){
        resultado = BAJA;
        idComplejidadDOM = 'BB_B';
        console.log(this.BB_B);
        this.changeStyle(this.BB_B);
      }else if(BAJA === complejidadTenologica && MEDIA === complejidadNegocio){
        resultado = MEDIA;
        idComplejidadDOM = 'BM_M';
        console.log(this.BM_M);
        this.changeStyle(this.BM_M);
      }else if(BAJA === complejidadTenologica && ALTA === complejidadNegocio) {
        resultado = ALTA;
        idComplejidadDOM = 'BA_A';
        console.log(this.BA_A);
        this.changeStyle(this.BA_A);
      }else if(MEDIA === complejidadTenologica && BAJA === complejidadNegocio){
        resultado = MEDIA;
        idComplejidadDOM = 'MB_M';
        console.log(this.MB_M);
        this.changeStyle(this.MB_M);
      }else if(MEDIA === complejidadTenologica && MEDIA === complejidadNegocio){
        resultado = MEDIA;
        idComplejidadDOM = 'MM_M';
        console.log(this.MM_M);
        this.changeStyle(this.MM_M);
      }else if(MEDIA === complejidadTenologica && ALTA === complejidadNegocio) {
        resultado = ALTA;
        idComplejidadDOM = 'MA_A';
        console.log(this.MA_A);
        this.changeStyle(this.MA_A);
      }else if(ALTA === complejidadTenologica && BAJA === complejidadNegocio){
        resultado = ALTA;
        idComplejidadDOM = 'AB_A';
        console.log(this.AB_A);
        this.changeStyle(this.AB_A);
      }else if(ALTA === complejidadTenologica && MEDIA === complejidadNegocio){
        resultado = ALTA;
        idComplejidadDOM = 'AM_A';
        console.log(this.AM_A);
        this.changeStyle(this.AM_A);
      }else if(ALTA === complejidadTenologica && ALTA === complejidadNegocio) {
        resultado = ALTA;
        idComplejidadDOM = 'AA_A';
        console.log(this.AA_A);
        this.changeStyle(this.AA_A);
      }

      let htmlRef = this.elementRef.nativeElement.querySelector(idComplejidadDOM);

    }else{
      if(this.arrayPuntosNegocio.length === 8){
        console.log("Faltan respondidas las preguntas Negocio");
      }else if(this.arrayPuntosNegocio.length === 8){
        console.log("Faltan responder las preguntas Tecnologia");
      }
    }

  }

  changeStyle(element: ElementRef){
    let arrayElement: Array<ElementRef> =
      [this.BB_B, this.BM_M, this.BA_A,
        this.MB_M, this.MM_M, this.MA_A,
        this.AB_A, this.AM_A, this.AA_A];

    arrayElement.forEach(item => {
      if(item === element){
        const nativeElement = element.nativeElement;
        console.log(nativeElement);
        this.renderer.removeClass(nativeElement,'my_th_deselect');
        this.renderer.addClass(nativeElement,'my_th_select');
      }else{
        const nativeElement = item.nativeElement;
        console.log(nativeElement);
        this.renderer.removeClass(nativeElement,'my_th_select');
        this.renderer.addClass(nativeElement,'my_th_deselect');
      }
    })
  }

  dibujarGraficoDeBarras(){
    let htmlRef = this.elementRef.nativeElement.querySelector(`#idChartBarras`);
    if (this.chartBarras) {
      this.chartBarras.destroy();
    }
    this.chartBarras = new Chart(htmlRef, {
      type:'bar',
      data:{
        labels:['Negocio', 'Tecnologia'],
        datasets:[{
          label: 'TOTAL DE PUNTOS',
          data:[this.totalPuntosNegocio, this.totalPuntosTecnologicos],
          backgroundColor:[
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ]
        }]
      },
      options:{
        scales:{
          x: {
            beginAtZero: true
          },
          y:{
            beginAtZero: true,
            min: 0,
            max: 25
          }
        }
      }
    });
  }

  dibujarGraficoDeLineas() {
    let htmlRef = this.elementRef.nativeElement.querySelector(`#idChartLineas`);
    if (this.chartLineas) {
      this.chartLineas.destroy();
    }
    this.chartLineas = new Chart(htmlRef, {
      type: 'line',
      data: {
        labels: ['Preg 1', 'Preg 2', 'Preg 3', 'Preg 4', 'Preg 5', 'Preg 6', 'Preg 7', 'Preg 8'],
        datasets: [
          {
            label: 'Negocio',
            data: this.arrayPuntosNegocio,
            pointBackgroundColor: 'rgb(255, 99, 132)',
            pointBorderColor: 'rgb(255, 99, 132)',
            borderWidth: 5
          },
          {
            label: 'Tecnologia',
            data: this.arrayPuntosTecnologico,
            pointBorderColor: 'rgb(54, 162, 235)',
            pointBackgroundColor: 'rgb(54, 162, 235)',
            borderWidth: 5
          }]
      },
      options:{
        scales:{
          x: {
            beginAtZero: true
          },
          y: {
            beginAtZero: false,
            position:'left',
            min:0,
            max:4,
            ticks: {
              stepSize: 1
            }
          },
          y1: {
            beginAtZero: false,
            position:'right',
            min:0,
            max:4,
            ticks: {
              stepSize: 1
            }
          }
        }
      }
    });
  }

  dibujarGraficoDeDispersion(){
    let htmlRef = this.elementRef.nativeElement.querySelector(`#idChartScatter`);
    if (this.chartScatter) {
      this.chartScatter.destroy();
    }
    this.chartScatter = new Chart(htmlRef, {
      type:'scatter',
      data:{
        labels: ['1','2'],
        datasets: [
          {
            label: 'Dataset 1',
            data: [
              {
                x: this.totalPuntosNegocio,
                y: this.totalPuntosTecnologicos
              }
            ],
            pointRadius: 20
          }]
      },
      options:{
        plugins:{
          title: {
            display: true,
            text: 'Matriz de complejidad'
          },
          tooltip:{
            enabled: true,
            position: 'nearest',
            callbacks:{

              }
            }
          }
        },
        scales:{
          x:{
            beginAtZero: false,
            min:8,
            max:24,
            ticks: {
              stepSize: 1
            }
          },
          y:{
            beginAtZero: false,
            min:8,
            max:24,
            ticks: {
              stepSize: 1
            }
          }
        }
      },
      plugins:[
        {
          id:'quadrant',
          beforeDatasetsDraw(chart){

            const {ctx, chartArea: {left, top, right, bottom}, scales: {x, y}} = chart;
            const midX = x.getPixelForValue(8);
            const midY = y.getPixelForValue(8);

            //const midY_top = y.getPixelForValue(24);
            const midX_11 = x.getPixelForValue(11.65);
            const midX_12 = x.getPixelForValue(12);
            const midX_19 = x.getPixelForValue(15.65);
            const midX_20 = x.getPixelForValue(20);

            const midX_end = x.getPixelForValue(11.65);

            ctx.save();

            ctx.fillStyle = 'rgba(75, 192, 192, 0.5)';
            ctx.fillRect(midX, top, midX_11, midY - top);

            ctx.fillStyle = 'rgba(255, 206, 86, 0.5)';
            ctx.fillRect(midX_12, top, midX_19, midY - top);

            ctx.fillStyle = 'rgba(255, 99, 132, 0.5)';
            ctx.fillRect(midX_20, top, midX_end, midY - top);

            ctx.restore();
          }
        }
      ]
    });
  }


}

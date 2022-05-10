import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatrizComplejidadComponent } from './pages/matriz_complejidad/matriz-complejidad.component';
import {FormsModule} from "@angular/forms";
import {MaterialModule} from "./material/material.module";
import { MatrizComplejidadNegocioComponent } from './pages/matriz_complejidad/negocio/matriz-complejidad-negocio/matriz-complejidad-negocio.component';
import { MatrizComplejidadTecnologiaComponent } from './pages/matriz_complejidad/tecnologia/matriz-complejidad-tecnologia/matriz-complejidad-tecnologia.component';
import { ResultadoComponent } from './pages/matriz_complejidad/resultado/resultado/resultado.component';
import {NgChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    AppComponent,
    MatrizComplejidadComponent,
    MatrizComplejidadNegocioComponent,
    MatrizComplejidadTecnologiaComponent,
    ResultadoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    NgChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

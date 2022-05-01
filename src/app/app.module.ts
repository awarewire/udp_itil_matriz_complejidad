import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatrizComplejidadComponent } from './pages/matriz_complejidad/matriz-complejidad.component';
import {FormsModule} from "@angular/forms";
import {MaterialModule} from "./material/material.module";
import {MatToolbarModule} from "@angular/material/toolbar";
import { MatrizComplejidadNegocioComponent } from './pages/matriz_complejidad/negocio/matriz-complejidad-negocio/matriz-complejidad-negocio.component';
import { MatrizComplejidadTecnologiaComponent } from './pages/matriz_complejidad/tecnologia/matriz-complejidad-tecnologia/matriz-complejidad-tecnologia.component';

@NgModule({
  declarations: [
    AppComponent,
    MatrizComplejidadComponent,
    MatrizComplejidadNegocioComponent,
    MatrizComplejidadTecnologiaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

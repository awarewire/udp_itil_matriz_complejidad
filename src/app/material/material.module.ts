import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from "@angular/material/table";
import {MatSelectModule} from "@angular/material/select";
import {MatToolbar, MatToolbarModule} from "@angular/material/toolbar";
import {MatCardModule} from "@angular/material/card";
import {CdkAccordionModule} from "@angular/cdk/accordion";
import {MatTabsModule} from "@angular/material/tabs";
import {MatTooltipModule} from "@angular/material/tooltip";

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    MatTableModule,
    MatSelectModule,
    MatToolbarModule,
    MatCardModule,
    CdkAccordionModule,
    MatTabsModule,
    MatTooltipModule
  ]
})
export class MaterialModule { }

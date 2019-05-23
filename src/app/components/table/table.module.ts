import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { TableComponent } from './table.component';

import {
  ColDirective,
  VirtualRowDirective,
  HeaderCellDirective,
  VirtualCellDirective,
  HeaderRowDirective
} from './table.directive';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    TableComponent,
    VirtualRowDirective,
    VirtualCellDirective,
    HeaderCellDirective,
    ColDirective,
    HeaderRowDirective
  ],
  imports: [CommonModule, ScrollingModule, PerfectScrollbarModule],
  exports: [
    TableComponent,
    ColDirective,
    HeaderCellDirective,
    VirtualCellDirective,
    VirtualRowDirective,
    HeaderRowDirective
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ]
})
export class TableModule {}

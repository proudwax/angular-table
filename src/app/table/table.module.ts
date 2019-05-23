import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSortModule } from '@angular/material';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { TableComponent } from './table.component';
import { ColDirective, RowDirective, CellDirective, RowOutletDirective } from './table.directive';
import { RowComponent } from './row/row.component';

@NgModule({
  declarations: [
    TableComponent,
    RowDirective,
    CellDirective,
    ColDirective,
    RowOutletDirective,
    RowComponent
  ],
  imports: [CommonModule, ScrollingModule],
  exports: [
    TableComponent,
    RowDirective,
    RowOutletDirective,
    ColDirective,
    CellDirective,
    RowComponent
  ],
  providers: []
})
export class TableModule {}

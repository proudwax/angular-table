import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ContentChild,
  ContentChildren,
  QueryList,
  ViewChild,
  ViewContainerRef
} from '@angular/core';

import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { RowDirective, ColDirective, RowOutletDirective } from './table.directive';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent
  implements OnInit, AfterViewInit, OnDestroy {
  @Input() dataSource: any;

  public rows: any[];

  private _onDestroy = new Subject<void>();

  @Input() trackBy: any;

  @ContentChildren(RowDirective) contentRow: QueryList<RowDirective>;
  @ContentChildren(ColDirective) contentCols: QueryList<ColDirective>;

  constructor(
    private _cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.rows = this.contentRow.map(row => {
      const columns = row.columns.map(name => {
        const column = this.contentCols.find(col => col.name === name);

        return column.cell;
      });

      return { ...row, cols: columns };
    });

    this._cdr.detectChanges();
  }


  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}

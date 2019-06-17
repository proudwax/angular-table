import {
  ContentChild,
  ContentChildren,
  Directive,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { VirtualCellDirective, HeaderCellDirective } from './cell';
import { CellOutlet } from './row';

export interface RowOutletContext {
  data: any;
  rows: any[];
  index: number;
  count: number;
  first: boolean;
  last: boolean;
  even: boolean;
  odd: boolean;
}


@Directive({
  selector: '[virtualRow]'
})
export class VirtualRowDirective {
  @Input('virtualRowColumns') columns: string[];
  @Input('virtualRowHeight') height = 50;
  @Input('virtualRowComponent') component: any;

  constructor(public template: TemplateRef<any>) {}
}

@Directive({
  selector: '[headerRow]'
})
export class HeaderRowDirective {
  @Input('headerRowColumns') columns: string[];
  @Input('headerRowSticky') sticky = false;

  constructor(public template: TemplateRef<any>) {}
}

@Directive({
  selector: '[col]'
})
export class ColDirective {
  @Input('col')
  set name(value: any) {
    this._name = value.toString();
  }
  get name() {
    return this._name;
  }
  private _name: string;

  @Input('colWidth') width: number;

  @ContentChildren(HeaderCellDirective) headerCells: any;
  @ContentChild(VirtualCellDirective) virtualCell: VirtualCellDirective;

  constructor() {}
}

export interface RowOutlet {
  viewContainer: ViewContainerRef;
}

@Directive({ selector: '[headerRowOutlet]' })
export class HeaderRowOutletDirective implements RowOutlet {
  constructor(
    public viewContainer: ViewContainerRef,
    public elementRef: ElementRef
  ) {}
}

@Directive({ selector: '[rowOutlet]' })
export class RowOutletDirective implements RowOutlet, OnInit, OnChanges {
  @Input('rowOutlet') context: RowOutletContext;

  constructor(
    public viewContainer: ViewContainerRef,
    public elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    console.log(this.context);
    
    this._renderRows(this.context);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.context && changes.context.previousValue !== void 0) {
      const context = changes.context.currentValue;

      this._renderRows(context);
    }
  }

  private _renderRows(context: RowOutletContext): void {
    const { data, rows, index, count, first, last, even, odd } = context;

    this.viewContainer.clear();

    rows.forEach(row => {
      this.viewContainer.createEmbeddedView(row.template, {
        $implicit: data,
        index,
        count,
        first,
        last,
        even,
        odd
      });

      for (const cell of row.virtualCells) {
        if (CellOutlet.mostRecentCellOutlet) {
          CellOutlet.mostRecentCellOutlet._viewContainer.createEmbeddedView(
            cell.template,
            {
              $implicit: data
            }
          );
        }
      }
    });
  }
}

import { Directive, OnDestroy, Input, TemplateRef, ViewContainerRef, ContentChild } from '@angular/core';
import { CdkVirtualForOfContext } from '@angular/cdk/scrolling';

@Directive({
  selector: '[row]'
})
export class RowDirective {
  @Input('rowColumns') columns: string[];

  constructor(public template: TemplateRef<any>) {}
}

@Directive({
  selector: '[cell]'
})
export class CellDirective {
  constructor(public template: TemplateRef<CdkVirtualForOfContext<any>>) {}
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

  @ContentChild(CellDirective) cell: CellDirective;

  constructor() {}
}

@Directive({
  selector: '[rowOutlet]'
})
export class RowOutletDirective implements OnDestroy {
  static staticRowOutlet: RowOutletDirective | null = null; 

  constructor(public viewContainer: ViewContainerRef) {
    RowOutletDirective.staticRowOutlet = this;
  }

  ngOnDestroy() {
    if (RowOutletDirective.staticRowOutlet === this) {
      RowOutletDirective.staticRowOutlet = null;
    }
  }
}

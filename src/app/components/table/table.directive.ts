import { CdkVirtualForOfContext } from '@angular/cdk/scrolling';
import {
  ContentChild,
  ContentChildren,
  Directive,
  Input,
  TemplateRef
} from '@angular/core';

@Directive({
  selector: '[headerCell]'
})
export class HeaderCellDirective {
  constructor(public template: TemplateRef<any>) {}
}

@Directive({
  selector: '[virtualCell]'
})
export class VirtualCellDirective {
  constructor(public template: TemplateRef<CdkVirtualForOfContext<any>>) {}
}

@Directive({
  selector: '[virtualRow]'
})
export class VirtualRowDirective {
  @Input('virtualRowColumns') columns: string[];
  @Input('virtualRowHeight') height = 50;

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

import {
  ComponentFactoryResolver,
  Directive,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Optional,
  Output,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { CellChangerComponent } from './cell-changer.component';
import { RowChangerDirective } from './row-changer.directive';
import { VirtualCellDirective } from '../table/cell';
import { RowComponent } from '../table/row';

@Directive({
  selector: '[cellChanger]'
})
export class CellChangerDirective implements OnInit, OnChanges {
  @Input('cellChanger') value: string | number | null;
  @Input() cellChangerIsEdit: boolean = false;
  @Input() cellChangerRow: RowChangerDirective;

  @Output() cellChange = new EventEmitter<string>();

  constructor(
    private _templateRef: TemplateRef<void>,
    private _viewContainerRef: ViewContainerRef,
    private _componentFactoryResolver: ComponentFactoryResolver,
    @Optional() private _parent: VirtualCellDirective,
    @Optional() private _row: RowComponent
  ) {}

  ngOnInit() {
    // console.log(this);
  }

  ngOnChanges() {
    this._viewContainerRef.clear();
    if (this.cellChangerIsEdit) {
      const componentFactory = this._componentFactoryResolver.resolveComponentFactory(
        CellChangerComponent
      );

      const viewContainerRef = this._viewContainerRef.createComponent(
        componentFactory
      );

      (<CellChangerComponent>viewContainerRef.instance).value = this.value;
    } else {
      this._viewContainerRef.createEmbeddedView(this._templateRef);
    }
  }
}

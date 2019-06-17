import {
  ComponentFactoryResolver,
  Directive,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  TemplateRef,
  ViewContainerRef,
  HostListener
} from '@angular/core';
import { CellChangerComponent } from './cell-changer.component';

@Directive({
  selector: '[cellChanger]'
})
export class CellChangerDirective implements OnChanges {
  @Input('cellChanger') value: string | number | null;
  @Input() cellChangerIsEdit: boolean = false;

  @Output() cellChange = new EventEmitter<string>();

  constructor(
    private _templateRef: TemplateRef<void>,
    private _viewContainerRef: ViewContainerRef,
    private _componentFactoryResolver: ComponentFactoryResolver
  ) {
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

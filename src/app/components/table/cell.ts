import { Directive, TemplateRef } from '@angular/core';
import { CdkVirtualForOfContext } from '@angular/cdk/scrolling';

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

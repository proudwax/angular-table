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
  ViewContainerRef,
  EmbeddedViewRef
} from '@angular/core';
import { RowOutletDirective } from '../table.directive';


@Component({
  selector: 'table-row, [table-row]',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.css'],
})
export class RowComponent implements OnInit, AfterViewInit {
  private viewInjector: EmbeddedViewRef<any>;

  constructor(private viewContainer: ViewContainerRef) {}

  ngOnInit() {
    this.viewInjector = (this.viewContainer.injector as any).view;

    console.log(this.viewInjector);
  }

  ngAfterViewInit() {
    const { data, cols } = this.viewInjector.context;

    (cols as any[]).forEach(col => {
      RowOutletDirective.staticRowOutlet.viewContainer.createEmbeddedView(
        col.template,
        { $implicit: data }
      )
    });
  }
}
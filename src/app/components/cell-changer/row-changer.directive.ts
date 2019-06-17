import {
  AfterViewInit,
  ChangeDetectorRef,
  Directive,
  ElementRef,
  Input,
  Component,
  ViewChildren,
  QueryList
} from '@angular/core';
import { fromEvent, merge, Observable, Subject } from 'rxjs';
import { filter, switchMap, take, takeUntil } from 'rxjs/operators';
import { RowComponent } from '../table/row';
import { CellChangerComponent } from './cell-changer.component';


@Directive({
  selector: '[rowChanger]',
  exportAs: 'rowChange'
})
export class RowChangerDirective implements AfterViewInit {
  private _destroyed = new Subject<void>();

  static mostRecentRow: RowChangerDirective | null = null;

  constructor(
    private _elementRef: ElementRef,
    private _cdr: ChangeDetectorRef,
    private _row: RowComponent
  ) {
    RowChangerDirective.mostRecentRow = this;

    this._createStream()
      .pipe(takeUntil(this._destroyed))
      .subscribe(data => {
        this._editable(false);
      });
  }

  private _createStream(): Observable<Event> {
    const click$ = fromEvent(document, 'click').pipe(
      takeUntil(this._destroyed),
      filter((e: Event) => !this._elementRef.nativeElement.contains(e.target))
    );

    const focusOut$ = fromEvent(
      this._elementRef.nativeElement,
      'focusout'
    ).pipe(
      takeUntil(this._destroyed),
      filter(
        (e: any) => !this._elementRef.nativeElement.contains(e.relatedTarget)
      )
    );

    return fromEvent(this._elementRef.nativeElement, 'dblclick').pipe(
      switchMap((event: Event) => {
        // event.stopPropagation();
        this._editable(true);
        console.log(event, this);

        return merge(click$, focusOut$).pipe(take(1));
      })
    );
  }

  private _editable(status: boolean): void {
    // this.data['_isEditing'] = status;
    this._cdr.markForCheck();
  }

  ngAfterViewInit() {
    // console.log(this);
  }

  ngOnDestroy() {
    // this.data['_isEditing'] = false;
    this._destroyed.next();
    this._destroyed.complete();
  }
}

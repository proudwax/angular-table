import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: '1 Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: '2 Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: '3 Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: '4 Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: '5 Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: '6 Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: '7 Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: '8 Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: '9 Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: '10 Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 11, name: '11 Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 12, name: '12 Helium', weight: 4.0026, symbol: 'He' },
  { position: 13, name: '13 Lithium', weight: 6.941, symbol: 'Li' },
  { position: 14, name: '14 Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 15, name: '15 Boron', weight: 10.811, symbol: 'B' },
  { position: 16, name: '16 Carbon', weight: 12.0107, symbol: 'C' },
  { position: 17, name: '17 Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 18, name: '18 Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 19, name: '19 Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 20, name: '20 Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 31, name: '1 Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 32, name: '2 Helium', weight: 4.0026, symbol: 'He' },
  { position: 33, name: '3 Lithium', weight: 6.941, symbol: 'Li' },
  { position: 34, name: '4 Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 35, name: '5 Boron', weight: 10.811, symbol: 'B' },
  { position: 36, name: '6 Carbon', weight: 12.0107, symbol: 'C' },
  { position: 37, name: '7 Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 38, name: '8 Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 39, name: '9 Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 40, name: '10 Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular';
  dataSource: MatTableDataSource<any>;
  columns = ['symbol', 'name', 'weight'];

  @ViewChild(MatSort) sort: MatSort;

  trackByFn(item: PeriodicElement, index: number) {
    return item.position;
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    this.dataSource.sort = this.sort;
  }
}

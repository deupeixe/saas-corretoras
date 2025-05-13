import { PropertyStoreService } from './../../../store/property-store.service';
import {
  AfterViewInit,
  Component,
  effect,
  inject,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { faExpand, faBath, faWarehouse, faBed, faCar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-admin-properties',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    CurrencyPipe,
    FontAwesomeModule,
    DecimalPipe
  ],
  templateUrl: './admin-properties.component.html',
  styleUrl: './admin-properties.component.scss',
})
export class AdminPropertiesComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  propertyStore = inject(PropertyStoreService);

  displayedColumns: string[] = ['status', 'thumb', 'title', 'other', 'actions'];
  dataSource = new MatTableDataSource([] as any[]);

  faExpand = faExpand;
  faBath = faBath;
  faWarehouse = faWarehouse;
  faBed = faBed;
  faCar = faCar;

  constructor() {
    effect(() => {
      if (this.propertyStore.select.state()) {
        this.setTable();
      }
    });
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  setTable() {
    const items = this.propertyStore.select.state();
    this.dataSource.data = items;
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(items);
    }, 500);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

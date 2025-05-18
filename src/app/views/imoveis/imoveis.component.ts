import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { Component, effect, inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faExpand, faBath, faWarehouse, faBed, faCar } from '@fortawesome/free-solid-svg-icons';
import { PropertyStoreService } from '../../store/property-store.service';
import { PropertyEditorComponent } from '../admin/property-editor/property-editor.component';
import { RouterLink } from '@angular/router';
import { UtilsService } from '../../services/utils.service';
import { EMeta } from '../../enums/meta';

@Component({
  selector: 'app-imoveis',
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
    DecimalPipe,
    RouterLink
  ],
  templateUrl: './imoveis.component.html',
  styleUrl: './imoveis.component.scss'
})
export class ImoveisComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  readonly propertyStore = inject(PropertyStoreService);
  readonly dialog = inject(MatDialog);
  readonly utils = inject(UtilsService);

  displayedColumns: string[] = ['thumb', 'title'];
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

  ngOnInit(): void {
    this.utils.setTitle('Telma Monteiro - Ímoveis no Maranhão, São luis e regiões');
    this.utils.updateMeta(EMeta.DESC_HOME, EMeta.KEY_SEARCH);
  }

  setTable() {
    const items = this.propertyStore.select.state();
    console.log(items)
    this.dataSource.data = items;
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 1000);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}

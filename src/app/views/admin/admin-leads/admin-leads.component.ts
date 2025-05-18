import { CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';
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
import { LeadStoreService } from '../../../store/lead-store.service';
import { AdminLeadEditorComponent } from './admin-lead-editor/admin-lead-editor.component';

@Component({
  selector: 'app-admin-leads',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    FontAwesomeModule,
    DatePipe
  ],
  templateUrl: './admin-leads.component.html',
  styleUrl: './admin-leads.component.scss'
})
export class AdminLeadsComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  readonly leadStore = inject(LeadStoreService);
  readonly dialog = inject(MatDialog);

  displayedColumns: string[] = ['status', 'nome', 'contato', 'item', 'data', 'actions'];
  dataSource = new MatTableDataSource([] as any[]);

  faExpand = faExpand;
  faBath = faBath;
  faWarehouse = faWarehouse;
  faBed = faBed;
  faCar = faCar;

  constructor() {
    effect(() => {
      if (this.leadStore.select.state()) {
        this.setTable();
      }
    });
  }

  setTable() {
    const items = this.leadStore.select.state();
    this.dataSource.data = items;
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(items);
    }, 1000);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openEditor(lead: any = undefined) {
    this.dialog.open(AdminLeadEditorComponent, {data: {lead}, minWidth: '1100px', height: '100%'});
  }

  removeItem(id: string){
    const res = confirm('Deletar item ?');
    if(!res){return}
    this.leadStore.actionRemove(id)
    console.log(res)
  }


}

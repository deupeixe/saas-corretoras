import { Component, effect, inject, OnInit } from '@angular/core';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { GridComponent } from '../../components/grid/grid.component';
import { PropertyStoreService } from '../../store/property-store.service';

@Component({
  selector: 'app-home',
  imports: [
    BreadcrumbComponent,
    GridComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  propertyStore = inject(PropertyStoreService);

  constructor(){
    effect(() => {
      console.log(this.propertyStore.select.state())
    })
  }

  ngOnInit(): void {
    // this.propertyStore.actionLoadAll();
  }

}

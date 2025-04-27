import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { GridComponent } from '../../components/grid/grid.component';

@Component({
  selector: 'app-home',
  imports: [
    BreadcrumbComponent,
    GridComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}

import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-container',
  imports: [
    MatButtonModule,
    RouterOutlet,
    RouterModule
  ],
  templateUrl: './admin-container.component.html',
  styleUrl: './admin-container.component.scss'
})
export class AdminContainerComponent {

  nav = [
    {
      title: 'Dashboard',
      url: '/admin'
    },    {
      title: 'Ímoveis',
      url: '/admin/imoveis'
    },    {
      title: 'Leads',
      url: '/leads'
    },

  ]

}

import { Component, inject, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { RouterModule, RouterOutlet } from '@angular/router';
import { LeadStoreService } from '../../../store/lead-store.service';


@Component({
  selector: 'app-admin-container',
  imports: [
    MatButtonModule,
    RouterOutlet,
    RouterModule,

  ],
  templateUrl: './admin-container.component.html',
  styleUrl: './admin-container.component.scss'
})
export class AdminContainerComponent implements OnInit {

  readonly leadStore = inject(LeadStoreService);


  nav = [
    {
      title: 'Dashboard',
      url: '/admin'
    },    {
      title: 'Ímoveis',
      url: '/admin/imoveis'
    },    {
      title: 'Leads',
      url: '/admin/leads'
    },
  ];

  ngOnInit(): void {
    this.leadStore.actionLoadAll();
  }

}

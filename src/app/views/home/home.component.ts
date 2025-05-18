import { Component, effect, inject, OnInit } from '@angular/core';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { GridComponent } from '../../components/grid/grid.component';
import { PropertyStoreService } from '../../store/property-store.service';
import { Action01Component } from '../../components/action-01/action-01.component';
import { SubscribeComponent } from '../../components/subscribe/subscribe.component';
import { ActionSocialComponent } from '../../components/action-social/action-social.component';

@Component({
  selector: 'app-home',
  imports: [
    BreadcrumbComponent,
    GridComponent,
    Action01Component,
    SubscribeComponent,
    ActionSocialComponent
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

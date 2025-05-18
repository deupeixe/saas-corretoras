import { Component, inject, OnInit } from '@angular/core';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { GridComponent } from '../../components/grid/grid.component';
import { PropertyStoreService } from '../../store/property-store.service';
import { Action01Component } from '../../components/action-01/action-01.component';
import { SubscribeComponent } from '../../components/subscribe/subscribe.component';
import { ActionSocialComponent } from '../../components/action-social/action-social.component';
import { UtilsService } from '../../services/utils.service';
import { EMeta } from '../../enums/meta';

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
  utils = inject(UtilsService);

  ngOnInit(): void {
    this.utils.setTitle('Telma Monteiro - Consultora de Ímoveis no Maranhão');
    this.utils.updateMeta(EMeta.DESC_HOME, EMeta.KEY_HOME);
  }

}

import { Component, effect, inject, Input, OnInit, signal } from '@angular/core';
import { SlidePropertyDetailsComponent } from '../../components/slide-property-details/slide-property-details.component';
import {MatButtonModule} from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { PropertyStoreService } from '../../store/property-store.service';
import { CurrencyPipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { LeadFormComponent } from '../../components/lead-form/lead-form.component';
import { Action01Component } from '../../components/action-01/action-01.component';
import { SubscribeComponent } from '../../components/subscribe/subscribe.component';
import { ActionSocialComponent } from '../../components/action-social/action-social.component';
import { UtilsService } from '../../services/utils.service';
import { EMeta } from '../../enums/meta';
@Component({
  selector: 'app-property-details',
  imports: [
    SlidePropertyDetailsComponent,
    MatButtonModule,
    CurrencyPipe,
    Action01Component,
    SubscribeComponent,
    ActionSocialComponent
  ],
  templateUrl: './property-details.component.html',
  styleUrl: './property-details.component.scss'
})
export class PropertyDetailsComponent {

  readonly propertyStore = inject(PropertyStoreService);
  readonly activatedRoute = inject(ActivatedRoute);
  readonly dialog = inject(MatDialog);
  readonly utils = inject(UtilsService);
  property: any;

  constructor(){
    effect(() => this.getProperty())
  }



  getProperty(){
    const slug = this.activatedRoute.snapshot.paramMap.get('slug');
    if(!slug){return}
    this.property = this.propertyStore.select.one(slug)();
    this.utils.setTitle(`Telma Monteiro - ${slug}`);
    this.utils.updateMeta(EMeta.KEY_DEFAULT, slug);
  }

  openLeadForm(){
    this.dialog.open(LeadFormComponent, {
      minWidth: '50dvw',
      data: {
        property: this.property,
      },
    });
    this.utils.setLog('open_formulario', {origem: this.property.titulo});
  }

}

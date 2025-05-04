import { Component, effect, inject, Input, OnInit, signal } from '@angular/core';
import { SlidePropertyDetailsComponent } from '../../components/slide-property-details/slide-property-details.component';
import {MatButtonModule} from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { PropertyStoreService } from '../../store/property-store.service';
import { CurrencyPipe } from '@angular/common';
@Component({
  selector: 'app-property-details',
  imports: [
    SlidePropertyDetailsComponent,
    MatButtonModule,
    CurrencyPipe
  ],
  templateUrl: './property-details.component.html',
  styleUrl: './property-details.component.scss'
})
export class PropertyDetailsComponent {

  propertyStore = inject(PropertyStoreService);
  activatedRoute = inject(ActivatedRoute);
  property: any;

  constructor(){
    effect(() => this.getProperty())
  }

  getProperty(){
    const slug = this.activatedRoute.snapshot.paramMap.get('slug');
    if(!slug){return}
    this.property = this.propertyStore.select.one(slug)();
    console.log(this.property)
  }


}

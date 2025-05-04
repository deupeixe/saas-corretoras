import { CurrencyPipe, DecimalPipe, formatNumber, JsonPipe, NgStyle, TitleCasePipe } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faExpand, faBath, faWarehouse, faBed, faCar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-card-item',
  imports: [
    NgStyle,
    TitleCasePipe,
    CurrencyPipe,
    RouterLink,
    FontAwesomeModule,
    DecimalPipe
  ],
  templateUrl: './card-item.component.html',
  styleUrl: './card-item.component.scss'
})
export class CardItemComponent{

  @Input({required: true}) item: any;

  faExpand = faExpand;
  faBath = faBath;
  faWarehouse = faWarehouse;
  faBed = faBed;
  faCar = faCar;

}

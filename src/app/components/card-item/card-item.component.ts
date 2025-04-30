import { CurrencyPipe, JsonPipe, NgStyle, TitleCasePipe } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-card-item',
  imports: [
    NgStyle,
    TitleCasePipe,
    CurrencyPipe
  ],
  templateUrl: './card-item.component.html',
  styleUrl: './card-item.component.scss'
})
export class CardItemComponent {


  @Input({required: true}) item: any;

}

import { CurrencyPipe, JsonPipe, NgStyle, TitleCasePipe } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card-item',
  imports: [
    NgStyle,
    TitleCasePipe,
    CurrencyPipe,
    RouterLink
  ],
  templateUrl: './card-item.component.html',
  styleUrl: './card-item.component.scss'
})
export class CardItemComponent implements OnInit {

  @Input({required: true}) item: any;

  ngOnInit(): void {
    console.log(this.item)
  }

}

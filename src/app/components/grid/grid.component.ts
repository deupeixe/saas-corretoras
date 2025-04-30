import { Component, Input, OnChanges, OnInit, Signal, signal, SimpleChanges } from '@angular/core';
import { CardItemComponent } from '../card-item/card-item.component';

@Component({
  selector: 'app-grid',
  imports: [
    CardItemComponent
  ],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss'
})
export class GridComponent{


  @Input() items: Signal<any[]> = signal([])
  @Input() loading = false;


}

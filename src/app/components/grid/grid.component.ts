import { Component, Input, OnChanges, OnInit, Signal, signal, SimpleChanges } from '@angular/core';
import { CardItemComponent } from '../card-item/card-item.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

@Component({
  selector: 'app-grid',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CardItemComponent,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    AsyncPipe,
    MatButtonToggleModule
  ],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss'
})
export class GridComponent implements OnInit{


  @Input() items: Signal<any[]> = signal([])
  @Input() loading = false;

  myControl = new FormControl('');

  options: string[] = ['Todas as regiões', 'Turu e região', 'Cohama e região', 'Anjo da guarda e região'];
  filteredOptions!: Observable<string[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }


}

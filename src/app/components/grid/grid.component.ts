import { Component, effect, inject, Input, OnChanges, OnInit, Signal, signal, SimpleChanges } from '@angular/core';
import { CardItemComponent } from '../card-item/card-item.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { AsyncPipe, TitleCasePipe } from '@angular/common';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import {MatChipsModule} from '@angular/material/chips';
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
    MatButtonToggleModule,
    TitleCasePipe,
    MatButtonModule,
    MatChipsModule
  ],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss'
})
export class GridComponent implements OnInit, OnChanges{


  @Input() items: Signal<any[]> = signal([])
  @Input() loading = false;

  formBuilder = inject(FormBuilder);

  form = this.formBuilder.group({
    region: ['Todas as regiões'],
    category: ['ambos'],
    type: ['ambos']

  })

  myControl = new FormControl('');


  options = {
    regions: ['Todas as regiões', 'Turu e região', 'Cohama e região', 'Anjo da guarda e região'],
    categories: ['comprar', 'alugar', 'ambos'],
    types: [
      {
        title: 'casas',
        value: 'casa',
      },
      {
        title: 'Comercial',
        value: 'comercial',
      },
      {
        title: 'Sitios',
        value: 'sitio',
      },
      {
        title: 'Fazendas e Terrenos',
        value: 'fazenda',
      },
      {
        title: 'Ambos',
        value: 'ambos',
      },
    ],

  } ;

  filteredOptions!: Observable<string[]>;

  filterItems = signal<any[]>([]);

  constructor(){
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.filterItems.set(this.items())
  }

  ngOnInit() {
    this.search();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        console.log(value)
        return this._filter(value || '');

      } ),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.regions.filter(option => option.toLowerCase().includes(filterValue));
  }

  search(){
    this.form.valueChanges.subscribe((values) => {
      const {region, type, category} = values


      this.filterItems.update(() => {
        const res = this.items().filter(elem => {
          let matchRegion = true;
          let matchCateg = true;
          let matchType = true;
          if(!region || region?.toLowerCase().includes('tod')){
            matchRegion = true;
          }else{
            matchRegion = true;
          }

          if(!category?.includes('ambos') && elem.categoria && category){
            matchCateg = String(elem.categoria).includes(category)
          }

          if(!type?.includes('ambos') && elem.tipo && type){
            matchType = String(elem.tipo).includes(type)
          }

          return matchRegion && matchCateg && matchType;

        });

        return res

      })

    })
  }

  clean(){
    this.form.patchValue({
      region: 'Todas as regiões',
      category: 'ambos',
      type: 'ambos'

    })

    console.log(this.form.value)
  }


}

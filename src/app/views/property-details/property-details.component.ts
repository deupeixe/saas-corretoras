import { Component, Input, signal } from '@angular/core';
import { SlidePropertyDetailsComponent } from '../../components/slide-property-details/slide-property-details.component';
import {MatButtonModule} from '@angular/material/button';
@Component({
  selector: 'app-property-details',
  imports: [
    SlidePropertyDetailsComponent,
    MatButtonModule
  ],
  templateUrl: './property-details.component.html',
  styleUrl: './property-details.component.scss'
})
export class PropertyDetailsComponent {


}

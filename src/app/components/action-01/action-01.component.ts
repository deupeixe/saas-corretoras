import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-action-01',
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    NgStyle
  ],
  templateUrl: './action-01.component.html',
  styleUrl: './action-01.component.scss'
})
export class Action01Component {

  whatsapp = environment.whatsapp.link;

}

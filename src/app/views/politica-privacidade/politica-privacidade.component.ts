import { Component } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-politica-privacidade',
  imports: [],
  templateUrl: './politica-privacidade.component.html',
  styleUrl: './politica-privacidade.component.scss'
})
export class PoliticaPrivacidadeComponent {

  email = environment.email

}

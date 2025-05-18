import { Component } from '@angular/core';
import { ActionSocialComponent } from '../../components/action-social/action-social.component';
import { MatButtonModule } from '@angular/material/button';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-servicos',
  imports: [
    ActionSocialComponent,
    MatButtonModule
  ],
  templateUrl: './servicos.component.html',
  styleUrl: './servicos.component.scss'
})
export class ServicosComponent {

  whatsapp = environment.whatsapp



}

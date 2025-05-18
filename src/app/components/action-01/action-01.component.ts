import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { environment } from '../../../environments/environment.development';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-action-01',
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './action-01.component.html',
  styleUrl: './action-01.component.scss'
})
export class Action01Component {

  readonly utils = inject(UtilsService);

  whatsapp = environment.whatsapp.link;

  setLog(){
    this.utils.setLog('open_whatsapp', {origem: 'Fale comigo pelo WhatsApp'});
  }

}

import { Component, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { UtilsService } from '../../services/utils.service';
import { EMeta } from '../../enums/meta';

@Component({
  selector: 'app-politica-privacidade',
  imports: [],
  templateUrl: './politica-privacidade.component.html',
  styleUrl: './politica-privacidade.component.scss'
})
export class PoliticaPrivacidadeComponent {

  utils = inject(UtilsService);

  email = environment.email

  ngOnInit(): void {
    this.utils.setTitle('Telma Monteiro - Política de privacidade - Consultora de Ímoveis no Maranhão');
    this.utils.updateMeta(EMeta.KEY_DEFAULT, 'Política de privacidade');
  }

}

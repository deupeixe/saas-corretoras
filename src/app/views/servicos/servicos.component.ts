import { Component, inject } from '@angular/core';
import { ActionSocialComponent } from '../../components/action-social/action-social.component';
import { MatButtonModule } from '@angular/material/button';
import { environment } from '../../../environments/environment.development';
import { EMeta } from '../../enums/meta';
import { UtilsService } from '../../services/utils.service';

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

  readonly utils = inject(UtilsService);

  ngOnInit(): void {
    this.utils.setTitle('Telma Monteiro - Serviços e Consultoria Imobiliária - Compra e venda de imóveis');
    this.utils.updateMeta(EMeta.DESC_HOME, EMeta.KEY_SOU);
  }



}

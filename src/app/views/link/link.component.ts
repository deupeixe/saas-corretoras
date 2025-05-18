import { Component, inject, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { UtilsService } from '../../services/utils.service';
import { MatButtonModule } from '@angular/material/button';
import { faPhone, faEnvelope, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-link',
  imports: [
    MatButtonModule,
    FontAwesomeModule
  ],
  templateUrl: './link.component.html',
  styleUrl: './link.component.scss'
})
export class LinkComponent implements OnInit {

  readonly utils = inject(UtilsService);

  whatsapp = environment.whatsapp.link;

    contacts = [
      {
        title: environment.fone.text,
        link: environment.fone.link,
        icon: faPhone,
      },
      {
        title: environment.email.text,
        link: environment.email.link,
        icon: faEnvelope,
      },
      {
        title: environment.address.text,
        link: environment.address.link,
        icon: faLocationDot,
      },

    ]

  ngOnInit(): void {
    this.utils.setLog('open_link', {origem: 'Instagram'});
  }


  setLog(){
    this.utils.setLog('open_whatsapp', {origem: 'Fale comigo pelo WhatsApp'});
  }

}


import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCoffee, faPhone, faEnvelope, faBars } from '@fortawesome/free-solid-svg-icons';
import {
  faWhatsapp,
  faFacebook,
  faInstagram,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-header',
  imports: [
    FontAwesomeModule,
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  faCoffee = faCoffee;
  faPhone = faPhone;
  faEnvelope = faEnvelope;
  faBars = faBars;


  contacts = [
      {
        text: environment.fone.text,
        icon: faWhatsapp,
        link: environment.whatsapp.link,
      },
      {
        text: environment.email.text,
        icon: faEnvelope,
        link: environment.email.link,
      },
      // {
      //   text: 'insta',
      //   icon: faInstagram,
      //   link: environment.instagram.link,
      // },
      // {
      //   text: 'faFacebook',
      //   icon: faFacebook,
      //   link: environment.facebook.link,
      // },
      // {
      //   text: 'youtube',
      //   icon: faYoutube,
      //   link: environment.youtube.link,
      // },
    ];


}

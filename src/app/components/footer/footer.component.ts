import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faWhatsapp,
  faFacebook,
  faInstagram,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import { faCoffee, faPhone, faEnvelope, faLocationDot, faBars, faAddressBook } from '@fortawesome/free-solid-svg-icons';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-footer',
  imports: [FontAwesomeModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  social = [
    {
      id: 'whatsapp',
      icon: faWhatsapp,
      link: environment.whatsapp.link,
    },
    {
      id: 'insta',
      icon: faInstagram,
      link: environment.instagram.link,
    },
    {
      id: 'faFacebook',
      icon: faFacebook,
      link: environment.facebook.link,
    },
    {
      id: 'youtube',
      icon: faYoutube,
      link: environment.youtube.link,
    },
  ];

  menu = [
    {
      title: 'Quem sou',
      link: '',
    },
    {
      title: 'Serviços e consultoria',
      link: '',
    },
    {
      title: 'Meus Ímoveis',
      link: '',
    },
    {
      title: 'Termos e política de privacidade',
      link: '',
    }

  ];

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
}

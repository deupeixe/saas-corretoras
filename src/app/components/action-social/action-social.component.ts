import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faWhatsapp, faInstagram, faFacebook, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { environment } from '../../../environments/environment.development';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-action-social',
  imports: [FontAwesomeModule, NgClass],
  templateUrl: './action-social.component.html',
  styleUrl: './action-social.component.scss'
})
export class ActionSocialComponent {

  @Input() hideBorder = false;

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

}

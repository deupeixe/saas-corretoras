
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCoffee, faPhone, faEnvelope, faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  imports: [
    FontAwesomeModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  faCoffee = faCoffee;
  faPhone = faPhone;
  faEnvelope = faEnvelope;
  faBars = faBars;


}

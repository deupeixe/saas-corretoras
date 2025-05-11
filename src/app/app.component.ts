import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { PropertyStoreService } from './store/property-store.service';
import { FooterComponent } from './components/footer/footer.component';
import { register } from 'swiper/element/bundle';

register();
@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'telmamonteiroSite';

  propertyStore = inject(PropertyStoreService);

  constructor(){
    this.propertyStore.actionLoadAll();

  }
}

import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { PropertyStoreService } from './store/property-store.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent
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

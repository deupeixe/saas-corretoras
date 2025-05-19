import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { PropertyStoreService } from './store/property-store.service';
import { FooterComponent } from './components/footer/footer.component';
import { register } from 'swiper/element/bundle';
import { filter } from 'rxjs';
import { UtilsService } from './services/utils.service';
import { ViewportScroller } from '@angular/common';

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
  readonly router = inject(Router);
  readonly utils = inject(UtilsService);
  readonly viewportScroller = inject(ViewportScroller);

  constructor(){
    this.propertyStore.actionLoadAll();
  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.utils.setLog('open_page', {origem: event.urlAfterRedirects});
        this.viewportScroller.scrollToPosition([0, 0]);

      });
  }
}

import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AuthStoreService } from '../../../store/auth-store.service';

@Component({
  selector: 'app-admin-login',
  imports: [MatButtonModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.scss'
})
export class AdminLoginComponent {

  authStore = inject(AuthStoreService);

  login(){
    this.authStore.actionLogin();

  }

}

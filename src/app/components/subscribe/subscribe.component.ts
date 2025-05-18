import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LeadStoreService } from '../../store/lead-store.service';
import { NgxMaskDirective } from 'ngx-mask';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { faWhatsapp, faInstagram, faFacebook, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { environment } from '../../../environments/environment.development';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-subscribe',
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    MatProgressBarModule,
    FontAwesomeModule
  ],
  templateUrl: './subscribe.component.html',
  styleUrl: './subscribe.component.scss',
})
export class SubscribeComponent {
  #formBuilder = inject(FormBuilder);
  readonly leadStore = inject(LeadStoreService);
  readonly utils = inject(UtilsService);

  form = this.#formBuilder.group({
    statu: ['aberto'],
    nome: ['', Validators.required],
    fone: [''],
    email: ['', Validators.email],
    turno: ['ambos'],
    semana: ['ambos'],
    data: [''],
    item: [{ id: '', titulo: 'Pagina principal' }],
    historico: this.#formBuilder.array([]),
  });

  templateRef = 'default';

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

  async save() {
    this.setLog();
    if (
      this.form.invalid ||
      (!this.form.value.fone && !this.form.value.email)
    ) {
      return;
    }
    await this.leadStore.actionSave(this.form.value);
    this.templateRef = 'finish';
  }

  setLog(){
    this.utils.setLog('open_formulario', {origem: 'subscribe home'});
  }
}

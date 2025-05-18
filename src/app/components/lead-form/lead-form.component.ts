import { Component, inject, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { LeadStoreService } from '../../store/lead-store.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { faFacebook, faInstagram, faWhatsapp, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { environment } from '../../../environments/environment.development';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-lead-form',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonToggleModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    NgxMaskDirective,
    MatProgressBarModule,
    FontAwesomeModule
  ],
  templateUrl: './lead-form.component.html',
  styleUrl: './lead-form.component.scss',
})
export class LeadFormComponent implements OnInit {
  #formBuilder = inject(FormBuilder);
  readonly data = inject(MAT_DIALOG_DATA);
  readonly leadStore = inject(LeadStoreService);

  templateRef = 'default';

  form = this.#formBuilder.group({
    statu: ['aberto'],
    nome: ['', Validators.required],
    fone: [''],
    email: ['', Validators.email],
    turno: ['ambos'],
    semana: ['ambos'],
    data: [''],
    item: [''],
    historico: this.#formBuilder.array([])
  });

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

  ngOnInit(): void {
    const item: any = {id: this.data.property.id, titulo: this.data.property.titulo } ;
    this.form.patchValue({
      data: new Date().toISOString(),
      item,
    });
  }

  async save() {
    console.log(this.form.invalid);
    if (
      this.form.invalid ||
      (!this.form.value.fone && !this.form.value.email)
    ) {
      return;
    }
    await this.leadStore.actionSave(this.form.value);
    this.templateRef = 'finish';

  }
}

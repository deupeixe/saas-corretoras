import { map } from 'rxjs';
import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LeadStoreService } from '../../../../store/lead-store.service';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatTimepickerModule} from '@angular/material/timepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
@Component({
  selector: 'app-admin-lead-editor',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatProgressBar,
    MatButtonToggleModule,
    MatTimepickerModule,
    MatDatepickerModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './admin-lead-editor.component.html',
  styleUrl: './admin-lead-editor.component.scss'
})
export class AdminLeadEditorComponent implements OnInit {


  readonly leadStore = inject(LeadStoreService);
  readonly dialogRef = inject(MatDialogRef<AdminLeadEditorComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);
  #formBuilder = inject(FormBuilder);

  form = this.#formBuilder.group({
    id: [''],
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

  historicoCtrl = this.form.get('historico') as FormArray;

  ngOnInit(): void {
    if(this.data?.lead){
      this.form.patchValue({...this.data?.lead});
      if(this.data?.lead?.historico?.length){
        for (let index = 0; index < this.data?.lead?.historico.length; index++) {
          const {data, horario, observacao} = this.data?.lead?.historico[index];
          this.addCtrl(data, horario, observacao)
        }

      }
    }
  }

  async save() {
    if (
      this.form.invalid ||
      (!this.form.value.fone && !this.form.value.email)
    ) {
      return;
    }

    const historico = this.historicoCtrl.value.map((elem: any) => {
      let {data, horario, observacao} = elem;
      data = data? new Date(data).toISOString(): data;
      horario = horario ? new Date(horario).toISOString() : horario;
      return {data, horario, observacao}
    });

    await this.leadStore.actionSave({...this.form.value, historico});
  }

  addCtrl(data: string = '', horario: string = '', observacao: string = ''){
    const group = this.#formBuilder.group({
      data,
      horario,
      observacao
    });
    this.historicoCtrl.push(group)

  }


}

import { PropertyStoreService } from './../../../store/property-store.service';
import { UploadService } from '../../../services/upload.service';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EFolderUpload } from '../../../enums/size-img';
import { BehaviorSubject } from 'rxjs';
import { NgxEditorComponent, NgxEditorMenuComponent, Editor } from 'ngx-editor';
import { UtilsService } from '../../../services/utils.service';
import {MatStepperModule} from '@angular/material/stepper';
import {MatSelectModule} from '@angular/material/select';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { MatDropzone } from '@ngx-dropzone/material';
import { AsyncPipe, UpperCasePipe } from '@angular/common';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { FileInputDirective } from '@ngx-dropzone/cdk';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-property-editor',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    FormsModule,
    ReactiveFormsModule,
    NgxEditorComponent,
    NgxEditorMenuComponent,
    MatStepperModule,
    MatSelectModule,
    NgxMaskDirective,
    UpperCasePipe,
    MatProgressBarModule,
    MatDropzone,
    FileInputDirective,
    MatIconModule
  ],
  templateUrl: './property-editor.component.html',
  styleUrl: './property-editor.component.scss'
})
export class PropertyEditorComponent implements OnInit {

  readonly dialogRef = inject(MatDialogRef<PropertyEditorComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);
  readonly utils = inject(UtilsService);
  readonly uploadService = inject(UploadService);
  readonly propertyStore = inject(PropertyStoreService)
  #formBuilder = inject(FormBuilder);


  form = this.#formBuilder.group({
    id: [''],
    status: ['aberto'],
    titulo: ['', Validators.required],
    descricao: [''],
    codigo: [''],
    categoria: ['', Validators.required],
    tipo: ['', Validators.required],
    preco: ['',Validators.required],
    iptu: [''],
    condominio: [''],
    area_util: [''],
    qtd_suite: [''],
    qtd_dorm: [''],
    qtd_ban: [''],
    qtd_vaga: [''],
    dets_imovel: [''],
    dets_area_comum: [''],
    dets_proximidades: [''],
    dets_outros: [''],
    insta_post: [''],
    thumb: [''],
    fotos: [[]],
    tour_virtual: [''],
    end_cep: [''],
    end_uf: ['',Validators.required],
    end_cidade: ['',Validators.required],
    end_bairro: [''],
    end_logradouro: [''],
    end_numero: [''],
    end_complemento: [''],
    url: [''],
    created_at: ['']
  });

  editor!: Editor;
  html = '';

  ctrltitulo = this.form.get('titulo') as FormControl;
  ctrldescricao = this.form.get('descricao') as FormControl;
  ctrlcategoria = this.form.get('categoria') as FormControl;
  ctrltipo = this.form.get('tipo') as FormControl;
  ctrlpreco = this.form.get('preco') as FormControl;
  ctrlFotos = this.form.get('fotos') as FormControl;

  estados: any[] = [];
  cidades: any[] = [];

  folder = EFolderUpload.anuncio;
  urlsFotos$ = new BehaviorSubject<string[]>([]);

  filesCtrl = new FormControl();
  fotos$= new BehaviorSubject<string[]>([]);

  loadingUpload = false;

  async ngOnInit() {
    this.editor = new Editor();
    this.utils.getLocalidades().subscribe((res: any) => {
      this.estados = res?.estados;
      setTimeout(() => {
        this.form.patchValue({ end_uf: 'MA' })
      }, 500)
    });

    if(this.data?.property){
      this.form.patchValue({...this.data?.property});
    }
  }

  ngAfterViewInit(): void {
    this.form.valueChanges.subscribe(c => {
      if (c?.end_uf) {
        this.cidades = this.estados.filter((elem: any) => elem?.sigla === c.end_uf).map((elem: any) => elem.cidades)[0] ?? [];
        setTimeout(() => {
          if (c?.end_uf === 'MA') {
            this.form.patchValue({ end_cidade: 'São Luís' })
          }
        }, 500)
      }
    });

    this.filesCtrl.valueChanges.subscribe(c => {
      if(!c?.length){return;}
      this.upload(c);
    });

  }

  async upload(files: File[]){
    this.loadingUpload = true;
    let fotos = this.ctrlFotos.value ?? [];
    fotos = fotos.filter((elem: any) => elem);

    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      const res = await this.uploadService.uploadIMG(file);
      if(res){
        fotos.push(res);
      }
    }

    this.loadingUpload = false;
    this.ctrlFotos.setValue(fotos)

  }

  async salvar(){
    const thumb = this.ctrlFotos.value[0] ?? ''
    const item = {...this.form.value, thumb, url: this.createUrl()} as any;
    const response = await this.propertyStore.actionSave(item);

    const {error, message} = response;
    this.utils.showMessage(message);
    if(error){return}
    this.dialogRef.close();
  }

  createUrl(){
    const titulo = String(this.form.value.titulo).toLocaleLowerCase();
    const cidade = String(this.form.value.end_cidade).toLocaleLowerCase();
    const uf = String(this.form.value.end_uf).toLocaleLowerCase();
    const bairro =  this.form.value.end_bairro ? String('no bairro ' + this.form.value.end_bairro).toLocaleLowerCase() : '';
    let result = `${titulo} ${cidade} ${uf} ${bairro}`;
    result = result.replace(/[áàãâäéèêëíìîïóòõôöúùûü]/g, (match) => {
      switch (match) {
        case "á": return "a";
        case "à": return "a";
        case "ã": return "a";
        case "â": return "a";
        case "ä": return "a";
        case "é": return "e";
        case "è": return "e";
        case "ê": return "e";
        case "ë": return "e";
        case "í": return "i";
        case "ì": return "i";
        case "î": return "i";
        case "ï": return "i";
        case "ó": return "o";
        case "ò": return "o";
        case "õ": return "o";
        case "ô": return "o";
        case "ö": return "o";
        case "ú": return "u";
        case "ù": return "u";
        case "û": return "u";
        case "ü": return "u";
        default: return match;
      }
    }).replace(/\s+/g, '-');

    return result;

  }

  remove(index: number){
    if(!this.ctrlFotos.value?.length){return}
    const fotos = this.ctrlFotos.value.filter((_: any, i: number) => i != index);
    this.ctrlFotos.setValue(fotos);
  }


}

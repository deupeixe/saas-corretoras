import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Analytics, logEvent } from '@angular/fire/analytics';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
   #http = inject(HttpClient);
   #snackBar = inject(MatSnackBar);
   readonly analytics = inject(Analytics);
   platformId = inject(PLATFORM_ID);
   title = inject(Title);

  url: string = '/estados-cidades-br.json';
  widthSize = new BehaviorSubject<number>(0);
  heigthSize = new BehaviorSubject<number>(0);

  tipos = ['casa', 'apartamento', 'comercial', 'sitios', 'fazendas', 'terrenos'  ];
  categorias = [
    'comprar',
    'alugar',
  ];

  areasImovel = [
    "Sala de estar",
    "Sala de jantar",
    "Cozinha",
    "Lavanderia",
    "Banheiros",
    "Quartos",
    "Varanda",
    "Quintal",
    "Sacada",
    "Terraço",
    "Área de serviço",
    "Escritório",
    "Home office",
    "Closet",
    "Despensa",
    "Garagem"
  ];

  areasComuns = [
    "Portaria",
    "Hall de entrada",
    "Áreas de circulação",
    "Elevadores",
    "Salão de festas",
    "Churrasqueira",
    "Piscina",
    "Quadra poliesportiva",
    "Playground",
    "Espaço gourmet",
    "Espaço fitness",
    "Espaço pet",
    "Lavanderia compartilhada",
    "Garagem",
    "Salão de jogos",
    "Sala de cinema",
    "Espaço coworking",
    "Espaço para eventos",
    "Espaço para festas infantil"
   ];

   itensProximos = [
    "Parque",
    "Praça",
    "Jardim",
    "Escola",
    "Hospital",
    "Supermercado",
    "Banco",
    "Restaurante",
    "Lojas",
    "Transporte público",
    "Vias de acesso",
    "Centro comercial",
    "Pontos turísticos"
  ];

  itensAdicionais = [
    "Depósito",
    "Guarita",
    "Manobrista",
    "Portão eletrônico",
    "Alarme",
    "Sistema de câmeras",
    "Piscina aquecida",
    "Churrasqueira a gás",
    "Jardim",
    "Horta",
    "Vista privilegiada",
    "Arquitetura moderna",
    "Decoração de alto padrão",
    "Imóvel reformado",
    "Imóvel novo",
    "Imóvel com potencial de valorização"
  ];

  nums: number[] = [];


  constructor(
  ) {this.generateNums() }

  setLog(name: string = 'view_item', params: any){
    if (isPlatformBrowser(this.platformId)) {
      logEvent(this.analytics, name, params);
    }
  }

  setTitle(value: string){
    if(isPlatformBrowser(this.platformId)){
      this.title.setTitle(value)
    }
  }

  updateMeta(description: string, keys: string) {
    if(isPlatformBrowser(this.platformId)){
      const metaTags = document.head.querySelectorAll('meta');
      metaTags.forEach(tag => {
        if (tag.name === 'description') {
          tag.setAttribute('content', description)
        }
        if (tag.name === 'keywords') {
          tag.setAttribute('content', keys)
        }
      })
    }

  }

  generateNums(){
    for (let index = 0; index <= 100; index++) {
      this.nums.push(index)
    }

  }

  copyText(txt: string = '') {
    if(!txt){return}
    // this.#clipboard.writeText(txt);
    // this.showMessage('Copiado para a área de transferência', 'X', {horizontalPosition: 'center', verticalPosition: 'top', duration: 3000});

  }

  openLinkInNewTab(url: string) {
    if(isPlatformBrowser(this.platformId)){
      window.open(url,'_blank');

    }
  }
  showMessage(message: string = '', action: string = 'X', config: MatSnackBarConfig = {horizontalPosition: 'center', verticalPosition: 'bottom', duration: 3000}){
    this.#snackBar.open(message, action, config);
  }

  filenameCreate(pre: any = '', pos: any = '') {
    const caracteres = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let resultado = '';

    for (let i = 0; i < 30; i++) {
      const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
      resultado += caracteres.charAt(indiceAleatorio);
    }

    return resultado;
  }

  getLocalidades(): Observable<{}> {
    return this.#http.get(this.url)
  }

  paramsJsonParse(itemRef: any[] | object): any[] | object {
    let result;
    if (!itemRef) { return itemRef; };
    if (Array.isArray(itemRef)) {
      result = itemRef.map(elem => this.checkParamIsJson(elem));
    } else if (typeof (itemRef) === 'object') {
      result = this.checkParamIsJson(itemRef);
    } else {
      return itemRef;
    }

    return result;

  }

  checkParamIsJson(item: any) {
    for (const key in item) {
      if (this.validJsonStr(item[key])) {
        item[key] = JSON.parse(item[key]);
      }
    }
    return item;
  }

  validJsonStr(str: any) {
    if (str === null || str === 'null') return false;
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  ordenarItens(arrayRef: Array<any>, param: string, tipo?: string) {
    //tipo: crescente e decrescente
    let result: any[];
    if (tipo) {
      switch (tipo) {
        case 'cresc':
          result = arrayRef.sort((a, b) => {
            if (a[param] > b[param]) {
              return 1;
            }
            if (a[param] < b[param]) {
              return -1;
            }
            return 0;
          });
          break;
        default:
          result = arrayRef.sort((a, b) => {
            if (a[param] < b[param]) {
              return 1;
            }
            if (a[param] > b[param]) {
              return -1;
            }
            return 0;
          });
          break;
      }

    } else {
      result = arrayRef.sort((a, b) => {
        if (a[param] < b[param]) {
          return 1;
        }
        if (a[param] > b[param]) {
          return -1;
        }
        return 0;
      });
    }

    return result;
  };

}

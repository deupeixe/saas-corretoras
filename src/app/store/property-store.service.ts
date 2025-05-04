import { computed, inject, Injectable, signal } from '@angular/core';
import { collection, CollectionReference, Firestore, getDocs } from '@angular/fire/firestore';
import { from, mergeMap, tap, toArray } from 'rxjs';
import { IResponse } from '../models/response';
import { resolve } from 'path';
import { paramsJsonParse } from '../utils/functions-utils';
import { UploadService } from '../services/upload.service';

@Injectable({
  providedIn: 'root'
})
export class PropertyStoreService {

  #firestore = inject(Firestore);
  #collectionRef: CollectionReference  = collection(this.#firestore, 'anuncios');
  #upload = inject(UploadService)

  #state = signal<any[]>([]);
  #loading = signal<boolean>(false);

  select = {
    state: computed(() => this.#state()),
    loading: computed(() => this.#loading()),
    one: (url:string) =>  this.#extractOne(url)
  }


  constructor() { }

  actionLoadAll() {
    return new Promise<IResponse>(resolve => {

      let response: IResponse = {error: true, results: undefined, message: 'Ocorreu um error ao obter itens.'}
      this.#loading.set(true);
      let results: any[] = [];

      getDocs(this.#collectionRef)
      .then(res => {
        res.forEach(async (doc) => {
          await results.push(doc.data())
        });

        from(results).pipe(
          mergeMap(async elem => {
            let fotos = elem['fotos'] ?? [];
            let thumb = elem?.thumb ? elem.thumb : fotos[0];

            thumb = await this.#upload.getImage(thumb, 'anuncios');
            return {...elem, thumb}
          }),
          toArray()
        ).subscribe((res) => {
          results = res;
          response = {error: false, results, message: 'Sucesso ao obter itens.'}
          this.#setInState(response)
          this.#loading.set(false);
          resolve(response)
        })


      }).catch(() => {
        this.#loading.set(false);
        resolve(response)
      } )

    })

  }

  #extractOne(slug: string){
    return computed(() => this.#state().find((elem) => elem?.url.includes(slug) || elem?.codigo.includes(slug) || elem?.id.includes(slug)))
  }

  #setInState(res: IResponse, replaceAll = false) {
    const { error, results } = res;
    if (error) { return }
    const entity: any[] = Array.isArray(results) ? results : [results];
    this.#state.update((current) => {
      if (replaceAll) {
        return entity.map(elem => paramsJsonParse(elem));

      } else {
        // Evita duplicações baseadas no ID
        const entityMap = new Map(entity.map(item => [item.id, item]));
        // Atualiza os itens existentes e adiciona os novos
        const updatedList = (current ?? []).map(item => entityMap.get(item.id) || item);
        const existingIds = new Set(updatedList.map(item => item.id));
        const newItems = entity.filter(item => !existingIds.has(item.id));
        const res: any[] = [...updatedList, ...newItems].map(elem => paramsJsonParse(elem));
        return res;
      }
    });
  }
}

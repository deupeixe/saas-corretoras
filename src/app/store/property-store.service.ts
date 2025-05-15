import { computed, inject, Injectable, signal } from '@angular/core';
import { collection, CollectionReference, doc, Firestore, getDocs, setDoc, updateDoc } from '@angular/fire/firestore';
import { firstValueFrom, from, mergeMap, Observable, tap, toArray } from 'rxjs';
import { IResponse } from '../models/response';
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


  readonly collectionRef!: CollectionReference;

  constructor() {

  }

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

  actionSave(item: any) {
    const res$ = new Observable<IResponse>(observer => {
      this.#loading.set(true);
      let response: IResponse = {};
      let ref: any;
      let newItem: any;
      if (item?.id) {
        ref = doc(this.#collectionRef, item.id);
        newItem = { ...item, id: ref.id, created_at: new Date().toISOString() };
        updateDoc(ref, newItem)
        .then(() => {
          response = { error: false, results: newItem, message: 'Item atualizado com sucesso!' };
          this.#setInState(response);
          observer.next(response)
        }).catch(err => {
          console.error(err);
          response = { error: true, results: undefined, message: 'Ocorreu um error ao tentar atualizar o item. Tente novamente!' }
          observer.next(response)
        })

      } else {
        ref = doc(this.#collectionRef);
        newItem = { ...item, id: ref.id, created_at: new Date().toISOString() };

        setDoc(ref, newItem)
          .then(() => {
            response = { error: false, results: newItem, message: 'Salvo com sucesso.' };
            observer.next(response)
          }).catch(err => {
            console.error(err);
            observer.next(response)
        });
      };
    })

    return firstValueFrom(res$
      .pipe(
        tap(res => {
          this.#loading.set(false);
          this.#setInState(res)
        })
      )
  )
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

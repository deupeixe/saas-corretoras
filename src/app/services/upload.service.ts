import { Injectable } from '@angular/core';
import { ESize } from '../enums/size-img';
import { StorageReference, getStorage, getDownloadURL, ref } from '@angular/fire/storage'

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  basePath = '/anuncios';
  storage = getStorage()
  storageRef: StorageReference = ref(this.storage);

  async getImage(name: string, folder: string, size: string = ESize.large) {
    const path = `${folder}/${size}/${name}`;
    this.storageRef = ref(this.storage, path);
    return await getDownloadURL(this.storageRef)
  }
}

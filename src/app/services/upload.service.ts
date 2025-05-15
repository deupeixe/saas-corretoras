import { Injectable } from '@angular/core';
import { ESize } from '../enums/size-img';
import { StorageReference, getStorage, getDownloadURL, ref, uploadBytes } from '@angular/fire/storage'

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

  async uploadIMG(file: File, folder = 'anuncios') {
    return new Promise<string>(async resolve => {
      if(!file){return;}
      const name = `img-${Math.random().toString(36).substring(2, 8)}${Date.now().toString(36)}`
      this.storageRef = ref(this.storage, `${folder}/${ESize.large}/${name}`);

      try {
        const resUpload = await uploadBytes(this.storageRef, file);
        const name = resUpload?.ref.name;
        const url = await this.getImage(name, folder);
        resolve(url)
      } catch (error) {
        console.error(error)
        resolve('')
      }
    })
  }
}

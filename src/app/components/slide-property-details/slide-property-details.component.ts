import { Component, CUSTOM_ELEMENTS_SCHEMA, HostListener, inject, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FullscreenMediaComponent } from '../fullscreen-media/fullscreen-media.component';
import { UploadService } from '../../services/upload.service';
import { from, mergeMap, toArray } from 'rxjs';
import { sortArray } from '../../utils/functions-utils';

@Component({
  selector: 'app-slide-property-details',
  imports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './slide-property-details.component.html',
  styleUrl: './slide-property-details.component.scss'
})
export class SlidePropertyDetailsComponent implements OnInit {

  @Input()property: any;

  dialog = inject(MatDialog);
  #upload = inject(UploadService);

  pageWidth: number = window.innerWidth;

  loading = {
    property: false,
    images: false
  };

  images: any = [];

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.pageWidth = window.innerWidth;
  }

  ngOnInit(): void {
   this.getImgs()
  }

  getImgs(){
    this.loading.images = true;
    let {fotos} = this.property;
    // fotos = fotos.filter((_:any, i: any) => i < 5)

    from(fotos).pipe(
      mergeMap(async (name: any, index: any) => {
        const url = await this.#upload.getImage(name, 'anuncios');
        return {url, index}
      }),
      toArray()
    ).subscribe(res => {
      this.images = sortArray(res, 'index');
      console.log(this.images)
      this.loading.images = false;
    } )

  }


  openMedia(index: number){
    this.dialog.open(FullscreenMediaComponent, {
      height: '100dvh',
      minWidth: '90dvw',

      data: {
        images: this.images,
        select: index
      },
    });

  }

}

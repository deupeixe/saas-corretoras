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

  }

  openMedia(index: number){
    this.dialog.open(FullscreenMediaComponent, {
      height: '100dvh',
      minWidth: '90dvw',

      data: {
        images: this.property.fotos,
        select: index
      },
    });
  }

}

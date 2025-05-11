import { NgClass } from '@angular/common';
import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, inject, signal, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import Swiper from 'swiper';

@Component({
  selector: 'app-fullscreen-media',
  imports: [
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    NgClass,
    MatButtonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './fullscreen-media.component.html',
  styleUrl: './fullscreen-media.component.scss'
})
export class FullscreenMediaComponent implements AfterViewInit {


  @ViewChild('swiperRef', { static: false }) swiperRef?: any;

  swiper: any;


  data = inject(MAT_DIALOG_DATA);
  selected = signal(0);

  ngAfterViewInit(): void {
    this.swiper = this.swiperRef?.nativeElement?.swiper;
    this.swiper.on('slideChangeTransitionStart',  (ev: any) => {
      this.selected.update(() => ev?.activeIndex ?? 0)
    });

  }

  select(index: any){
    this.swiper.slideTo(index, 1000, false);
    this.selected.update(() => index)
  }

  getCurrentSlideIndex() {
    const swiperInstance: Swiper | undefined = this.swiper?.swiperRef;
    if (swiperInstance) {
      console.log('Slide atual:', swiperInstance.activeIndex);
    }
  }


}

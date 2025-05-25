import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { PropertyStoreService } from './../../store/property-store.service';
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, OnChanges, PLATFORM_ID, effect, inject, AfterViewInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import Swiper from 'swiper';

@Component({
  selector: 'app-insta-posts',
  imports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './insta-posts.component.html',
  styleUrl: './insta-posts.component.scss'
})
export class InstaPostsComponent implements AfterViewInit{
  @ViewChild('swiperContainer', { static: true }) swiperContainer!: ElementRef;


  readonly sanitizer = inject(DomSanitizer);
  readonly propertyStore = inject(PropertyStoreService);
  readonly platformId = inject(PLATFORM_ID);
  readonly renderer = inject(Renderer2)

  swiper!: Swiper;

  insta_posts: SafeHtml[] = [];


  constructor(){
    effect(() => {
      if(this.propertyStore.select.instaPosts()().length){
        this.setInstaPosts();
      }
    })
  }
  ngAfterViewInit(): void {

  }


  setInstaPosts(){
    if(isPlatformBrowser(this.platformId) ){
      this.insta_posts = this.propertyStore.select.instaPosts()().map(elem => this.sanitizer.bypassSecurityTrustHtml(elem) );

      const wrapper = this.swiperContainer.nativeElement.querySelector('.swiper-wrapper');

      this.insta_posts.forEach(postUrl => {
        const slide = this.renderer.createElement('div');
        this.renderer.addClass(slide, 'swiper-slide');

        const iframe = this.renderer.createElement('iframe');
        this.renderer.setAttribute(iframe, 'width', '400');
        this.renderer.setAttribute(iframe, 'height', '560');
        this.renderer.setAttribute(iframe, 'frameborder', '0');
        this.renderer.setAttribute(iframe, 'scrolling', 'no');
        this.renderer.setAttribute(iframe, 'allowtransparency', 'true');
        this.renderer.setAttribute(iframe, 'src', postUrl as string); // SafeResourceUrl convertido para string

        this.renderer.appendChild(slide, iframe);
        this.renderer.appendChild(wrapper, slide);
      });

      // Inicializando o Swiper
      this.swiper = new Swiper(this.swiperContainer.nativeElement, {
        slidesPerView: 1,
        spaceBetween: 20,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        breakpoints: {
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 4 }
        }
      });
    }

  }



}

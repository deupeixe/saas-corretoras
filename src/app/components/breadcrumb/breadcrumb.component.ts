import { NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  imports: [
    NgStyle
  ],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent {

  @Input({required: true}) item: {title: string, subtitle: string} = {title: 'Meus ímoveis', subtitle: 'Casas, apartamentos, empreendimentos e muito mais'}

}

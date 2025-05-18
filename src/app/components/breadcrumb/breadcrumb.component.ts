import { NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  imports: [
    NgStyle,
    RouterLink
  ],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent {

  @Input() item: {title: string, subtitle: string} = {title: 'Meus ímoveis', subtitle: 'Casas, apartamentos, empreendimentos e muito mais'}

}

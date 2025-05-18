import { Component, inject } from '@angular/core';
import { ActionSocialComponent } from '../../components/action-social/action-social.component';
import { UtilsService } from '../../services/utils.service';
import { EMeta } from '../../enums/meta';

@Component({
  selector: 'app-quem-sou',
  imports: [
    ActionSocialComponent
  ],
  templateUrl: './quem-sou.component.html',
  styleUrl: './quem-sou.component.scss'
})
export class QuemSouComponent {

  readonly utils = inject(UtilsService);

  ngOnInit(): void {
    this.utils.setTitle('Telma Monteiro - Quem sou');
    this.utils.updateMeta(EMeta.DESC_HOME, EMeta.KEY_SOU);
  }

}

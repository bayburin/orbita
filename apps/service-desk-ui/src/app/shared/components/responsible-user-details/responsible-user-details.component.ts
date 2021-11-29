import { Component, Input } from '@angular/core';

import { ResponsibleUserI } from '../../../core/interfaces/responsible-user.interface';
import { contentBlockAnimation } from '../../../core/animations/content.animation';

@Component({
  selector: 'service-desk-ui-responsible-user-details',
  templateUrl: './responsible-user-details.component.html',
  styleUrls: ['./responsible-user-details.component.sass'],
  animations: [contentBlockAnimation],
})
export class ResponsibleUserDetailsComponent {
  @Input() label: string;
  @Input() users: ResponsibleUserI[];

  /**
   * Возвращает true, если в массиве users имеется хотя бы один ответственный с объектом details.
   */
  isShowDetails(): boolean {
    return this.users.some((user) => (user.details ? true : false));
  }
}

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ResponsibleUser } from '@orbita/service-desk-ui/domain-logic';

import { contentBlockAnimation } from './../../animations/content.animation';

@Component({
  selector: 'lib-responsible-user-list',
  templateUrl: './responsible-user-list.component.html',
  styleUrls: ['./responsible-user-list.component.scss'],
  animations: [contentBlockAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResponsibleUserListComponent {
  /**
   * Подпись перед списком ответственных
   */
  @Input() label: string;
  /**
   * Список ответственных
   */
  @Input() responsibleUsers: ResponsibleUser[];

  trackByResponsibleUser(index: number, responsibleUser: ResponsibleUser) {
    return responsibleUser.id;
  }

  /**
   * Возвращает true, если в массиве users имеется хотя бы один ответственный с объектом details.
   */
  hasDetails(): boolean {
    return this.responsibleUsers.some((user) => (user.details ? true : false));
  }
}

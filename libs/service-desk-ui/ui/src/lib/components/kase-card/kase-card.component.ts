import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { Kase } from '@orbita/service-desk-ui/domain-logic';

@Component({
  selector: 'lib-kase-card',
  templateUrl: './kase-card.component.html',
  styleUrls: ['./kase-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KaseCardComponent {
  /**
   * Заявка
   */
  @Input() kase: Kase;
  /**
   * Событие оценки качества обслуживания по заявке
   */
  @Output() vote = new EventEmitter<number>();
  /**
   * Событие отмены заявки
   */
  @Output() revoke = new EventEmitter<void>();

  /**
   * Проверяет, закрыта ли заявка
   */
  isClosed(): boolean {
    return this.kase.status_id === 3 || this.kase.status_id === 4;
  }

  /**
   * Проверяет, разрешено ли голосование
   */
  isAllowedToVote(): boolean {
    return this.kase.status_id === 3 && !this.kase.rating;
  }
}

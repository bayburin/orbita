import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

import { Kase } from '@orbita/service-desk-ui/domain-logic';
import { contentListAnimation } from './../../animations/content.animation';

@Component({
  selector: 'lib-kase-list',
  templateUrl: './kase-list.component.html',
  styleUrls: ['./kase-list.component.scss'],
  animations: [contentListAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KaseListComponent implements OnChanges {
  /**
   * Список заявок
   */
  @Input() kases: Kase[];
  /**
   * Событие отмены заявки
   */
  @Output() revoke = new EventEmitter<Kase>();
  /**
   * Событие выбора оценки качества обслуживания
   */
  @Output() vote = new EventEmitter<{ kase: Kase; rating: number }>();
  rowGroupedKases: Kase[][];

  ngOnChanges(): void {
    this.rowGroupedKases = [];
    for (let i = 0; i < this.kases.length; i += 2) {
      this.rowGroupedKases.push(this.kases.slice(i, i + 2));
    }
  }

  trackByKase(index: number, kase: Kase) {
    return kase.case_id;
  }
}

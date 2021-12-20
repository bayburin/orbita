import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { Filter } from '@orbita/service-desk-ui/domain-logic';

@Component({
  selector: 'lib-filter-template',
  templateUrl: './filter-template.component.html',
  styleUrls: ['./filter-template.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterTemplateComponent {
  /**
   * Список фильтров
   */
  @Input() filters: Filter[];
  /**
   * Id выбранного фильтра
   */
  @Input() selectedId: number;
  /**
   * Событие выбора фильтра
   */
  @Output() selectFilter = new EventEmitter<number>();

  trackByFilter(index: number, filter: Filter) {
    return filter.id;
  }
}

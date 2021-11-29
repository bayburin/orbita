import { Component, Input, Output, EventEmitter } from '@angular/core';

import { FilterI } from '../../../core/interfaces/filter.interface';
import { Category } from '../../../modules/ticket/models/category/category.model';
import { Service } from '../../../modules/ticket/models/service/service.model';
import { Ticket } from '../../../modules/ticket/models/ticket/ticket.model';

@Component({
  selector: 'service-desk-ui-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent {
  @Input() data: FilterI[] = [];
  @Output() changeFilter = new EventEmitter<any>();
  selectedFilterId: any; // Category | Service | Ticket;

  /**
   * Событие выбора фильтра.
   *
   * @param FilterId - Id выбранного фильтра.
   */
  selectFilter(filterId: any) {
    this.selectedFilterId = filterId;
    this.changeFilter.emit(this.selectedFilterId);
  }

  trackByFilter(index: number, filter: FilterI) {
    return filter.id;
  }
}

import { Component, OnInit } from '@angular/core';

import { DeepSearchFacade, DeepSearchFilterTypes } from '@orbita/service-desk-ui/domain-logic';
import { contentBlockAnimation } from '@orbita/service-desk-ui/ui';

@Component({
  selector: 'lib-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  animations: [contentBlockAnimation],
})
export class SearchComponent implements OnInit {
  loading$ = this.deepSearchFacade.loading$;
  loaded$ = this.deepSearchFacade.loaded$;
  result$ = this.deepSearchFacade.result$;
  resultTypes$ = this.deepSearchFacade.resultTypes$;
  selectedResultTypeId$ = this.deepSearchFacade.selectedResultTypeId$;

  constructor(private deepSearchFacade: DeepSearchFacade) {}

  ngOnInit(): void {
    this.deepSearchFacade.search();
  }

  /**
   * Отфильтровать результаты поиска в соответствии с выбранным типом данных
   *
   * @param selectedStatusId - id выбранного типа данных
   */
  selectFilter(selectedResultTypeId: string | number): void {
    this.deepSearchFacade.setSelectedResultTypeId(selectedResultTypeId as DeepSearchFilterTypes);
  }
}

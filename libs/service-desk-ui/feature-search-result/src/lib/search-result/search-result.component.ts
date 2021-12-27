import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { DeepSearchFacade, DeepSearchFilterTypes } from '@orbita/service-desk-ui/domain-logic';
import { contentBlockAnimation } from '@orbita/service-desk-ui/ui';

@Component({
  selector: 'lib-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
  animations: [contentBlockAnimation],
})
export class SearchResultComponent implements OnInit, OnDestroy {
  loading$ = this.deepSearchFacade.loading$;
  loaded$ = this.deepSearchFacade.loaded$;
  result$ = this.deepSearchFacade.result$;
  resultTypes$ = this.deepSearchFacade.resultTypes$;
  selectedResultTypeId$ = this.deepSearchFacade.selectedResultTypeId$;
  isAnyResult$ = this.deepSearchFacade.isAnyResult$;
  subscriptions = new Subscription();

  constructor(private deepSearchFacade: DeepSearchFacade, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.subscriptions.add(this.route.queryParams.subscribe(() => this.deepSearchFacade.search()));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
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

import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import {
  AttachmentFacade,
  DeepSearchFacade,
  DeepSearchFilterTypes,
  EmployeeFacade,
  QuestionFacade,
  QuestionOverviewVM,
  Attachment,
  SearchResultTypes,
} from '@orbita/service-desk-ui/domain-logic';
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
  attachmentLoadingIds$ = this.attachmentFacade.loadingIds$;
  isAnyResult$ = this.deepSearchFacade.isAnyResult$;
  employeeLoaded$ = this.employeeFacade.loaded$;
  subscriptions = new Subscription();

  constructor(
    private deepSearchFacade: DeepSearchFacade,
    private employeeFacade: EmployeeFacade,
    private attachmentFacade: AttachmentFacade,
    private questionFacade: QuestionFacade,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(this.route.queryParams.subscribe(() => this.deepSearchFacade.search()));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.deepSearchFacade.clearSearchResult();
  }

  /**
   * Увеличивает рейтинг популярности вопроса
   *
   * @param question - вопрос
   */
  upRating(result: SearchResultTypes) {
    this.questionFacade.upRating(result as QuestionOverviewVM);
  }

  /**
   * Скачивает файл
   *
   * @param attachment - файл
   */
  downloadAttachment(attachment: Attachment): void {
    this.attachmentFacade.download(attachment);
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

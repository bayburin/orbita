import { Component } from '@angular/core';

import { SdRequestFacade } from '@orbita/ticket-system/domain-logic';

@Component({
  selector: 'lib-sd-requests-block',
  templateUrl: './sd-requests-block.component.html',
  styleUrls: ['./sd-requests-block.component.scss']
})
export class SdRequestsBlockComponent {
  loading$ = this.sdRequestFacade.loading$;
  sdRequests$ = this.sdRequestFacade.all$;
  page$ = this.sdRequestFacade.page$;
  totalCount$ = this.sdRequestFacade.totalCount$;
  maxSize$ = this.sdRequestFacade.maxSize$;

  constructor(private sdRequestFacade: SdRequestFacade) {}

  /**
   * Событие выбора номера страницы
   *
   * @param page - выбранный номер страницы
   */
  onPageChagned(page: number): void {
    this.sdRequestFacade.setPage(page);
  }
}

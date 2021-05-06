import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { SdRequestFacade, SdRequest } from '@orbita/ticket-system/domain-logic';

@Component({
  selector: 'lib-sd-requests-table',
  templateUrl: './sd-requests-table.component.html',
  styleUrls: ['./sd-requests-table.component.scss']
})
export class SdRequestsTableComponent implements OnInit {
  loading$: Observable<boolean> = this.sdRequestFacade.loading$;
  sdRequests$: Observable<SdRequest[]> = this.sdRequestFacade.all$;
  page$: Observable<number> = this.sdRequestFacade.page$;
  totalCount$: Observable<number> = this.sdRequestFacade.totalCount$;
  maxSize$: Observable<number> = this.sdRequestFacade.maxSize$;

  constructor(private sdRequestFacade: SdRequestFacade) { }

  ngOnInit(): void {
    this.sdRequestFacade.loadAll();
  }

  /**
   * Событие выбора номера страницы
   *
   * @param page - выбранный номер страницы
   */
  onPageChagned(page: number): void {
    this.sdRequestFacade.setPage(page);
  }
}

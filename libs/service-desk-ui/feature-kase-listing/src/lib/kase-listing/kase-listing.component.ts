import { Component, OnInit } from '@angular/core';

import { KaseFacade, Kase } from '@orbita/service-desk-ui/domain-logic';
import { contentBlockAnimation } from '@orbita/service-desk-ui/ui';

@Component({
  selector: 'service-desk-ui-kase-listing-kase-listing',
  templateUrl: './kase-listing.component.html',
  styleUrls: ['./kase-listing.component.scss'],
  animations: [contentBlockAnimation],
})
export class KaseListingComponent implements OnInit {
  all$ = this.kaseFacade.all$;
  initLoading$ = this.kaseFacade.initLoading$;
  loading$ = this.kaseFacade.loading$;
  loaded$ = this.kaseFacade.loaded$;
  statuses$ = this.kaseFacade.statuses$;
  selectedStatusId$ = this.kaseFacade.selectedStatusId$;
  isAnyKase$ = this.kaseFacade.isAnyKase$;

  constructor(private kaseFacade: KaseFacade) {}

  ngOnInit(): void {
    this.kaseFacade.init();
  }

  /**
   * Отменить заявку
   *
   * @param kase - заявка
   */
  revoke(kase: Kase): void {
    if (kase.status_id !== 1) {
      alert(
        'Отменить можно только заявку, имеющую статус "Не обработано". Если вы действительно хотите отменить текущую заявку, обратитесь по тел. 06.'
      );
      return;
    }

    if (!confirm('Вы действительно хотите отменить заявку №' + kase.case_id + '?')) {
      return;
    }

    this.kaseFacade.revoke(kase.case_id);
  }

  /**
   * Оценить качество обслуживания
   *
   * @param event - событие, содержащее параметры: { kase - заявка, rating - выбранная оценка качества обслуживания }
   */
  vote(event: { kase: Kase; rating: number }): void {
    this.kaseFacade.vote(event.kase.case_id, event.rating);
  }

  /**
   * Установить новый статус и загрузить соответствующие данные
   *
   * @param selectedStatusId - id выбранного статуса
   */
  selectFilter(selectedStatusId: string | number): void {
    this.kaseFacade.setSelectedStatusId(selectedStatusId as number);
  }
}

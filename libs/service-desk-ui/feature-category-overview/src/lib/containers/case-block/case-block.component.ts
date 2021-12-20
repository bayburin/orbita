import { Component, OnInit } from '@angular/core';

import { KaseFacade, Kase } from '@orbita/service-desk-ui/domain-logic';
import { contentBlockAnimation } from '@orbita/service-desk-ui/ui';

@Component({
  selector: 'lib-case-block',
  templateUrl: './case-block.component.html',
  styleUrls: ['./case-block.component.scss'],
  animations: [contentBlockAnimation],
})
export class CaseBlockComponent implements OnInit {
  all$ = this.kaseFacade.all$;
  initLoading$ = this.kaseFacade.initLoading$;
  loading$ = this.kaseFacade.loading$;
  loaded$ = this.kaseFacade.loaded$;
  statusId: number = null;

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
}
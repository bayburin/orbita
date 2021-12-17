import { Component, OnInit } from '@angular/core';

import { KaseFacade } from '@orbita/service-desk-ui/domain-logic';
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
}

import { Component, OnDestroy, OnInit } from '@angular/core';

import { CategoryFacade, KaseFacade } from '@orbita/service-desk-ui/domain-logic';
import { contentBlockAnimation } from '@orbita/service-desk-ui/ui';

@Component({
  selector: 'lib-category-overview',
  templateUrl: './category-overview.component.html',
  styleUrls: ['./category-overview.component.scss'],
  animations: [contentBlockAnimation],
})
export class CategoryOverviewComponent implements OnInit, OnDestroy {
  category$ = this.categoryFacade.selected$;
  loading$ = this.categoryFacade.loading$;
  loaded$ = this.categoryFacade.loaded$;

  constructor(private categoryFacade: CategoryFacade, private kaseFacade: KaseFacade) {}

  ngOnInit(): void {
    this.categoryFacade.loadSelected();
  }

  ngOnDestroy(): void {
    this.kaseFacade.clearSelectedServices();
  }
}

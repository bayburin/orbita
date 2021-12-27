import { Component, OnInit } from '@angular/core';

import { CategoryFacade } from '@orbita/service-desk-ui/domain-logic';

@Component({
  selector: 'lib-category-listing',
  templateUrl: './category-listing.component.html',
  styleUrls: ['./category-listing.component.scss'],
})
export class CategoryListingComponent implements OnInit {
  all$ = this.categoryFacade.all$;
  loading$ = this.categoryFacade.loading$;
  loaded$ = this.categoryFacade.loaded$;

  constructor(private categoryFacade: CategoryFacade) {}

  ngOnInit(): void {
    this.categoryFacade.loadAll();
  }
}
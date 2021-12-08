import { Component, OnInit } from '@angular/core';

import { CategoryFacade } from '@orbita/service-desk-ui/domain-logic';

@Component({
  selector: 'lib-categories-block',
  templateUrl: './categories-block.component.html',
  styleUrls: ['./categories-block.component.scss'],
})
export class CategoriesBlockComponent implements OnInit {
  all$ = this.categoryFacade.all$;
  loading$ = this.categoryFacade.loading$;
  loaded$ = this.categoryFacade.loaded$;

  constructor(private categoryFacade: CategoryFacade) {}

  ngOnInit(): void {
    this.categoryFacade.loadAll();
  }
}

import { Component, OnInit } from '@angular/core';

import { CategoryFacade } from '@orbita/service-desk-ui/domain-logic';
import { contentBlockAnimation } from '@orbita/service-desk-ui/ui';

@Component({
  selector: 'lib-category-block',
  templateUrl: './category-block.component.html',
  styleUrls: ['./category-block.component.scss'],
  animations: [contentBlockAnimation],
})
export class CategoryBlockComponent implements OnInit {
  category$ = this.categoryFacade.selected$;
  loading$ = this.categoryFacade.loading$;
  loaded$ = this.categoryFacade.loaded$;

  constructor(private categoryFacade: CategoryFacade) {}

  ngOnInit(): void {
    this.categoryFacade.loadSelected();
  }
}

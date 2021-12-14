import { Component, OnInit } from '@angular/core';

import { CategoryFacade } from '@orbita/service-desk-ui/domain-logic';

@Component({
  selector: 'lib-category-block',
  templateUrl: './category-block.component.html',
  styleUrls: ['./category-block.component.scss'],
})
export class CategoryBlockComponent implements OnInit {
  constructor(private categoryFacade: CategoryFacade) {}

  ngOnInit(): void {
    this.categoryFacade.loadSelected();
  }
}

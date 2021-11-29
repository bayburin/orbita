import { Component, Input } from '@angular/core';

import { Category } from '../../models/category/category.model';

@Component({
  selector: 'service-desk-ui-category-page-content',
  templateUrl: './category-page-content.component.html',
  styleUrls: ['./category-page-content.component.scss'],
})
export class CategoryPageContentComponent {
  @Input() data: Category;

  generateLink(): string {
    return this.data.getShowLink();
  }
}

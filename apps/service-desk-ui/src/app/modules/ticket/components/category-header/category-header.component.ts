import { Component, Input } from '@angular/core';

import { Category } from '../../models/category/category.model';

@Component({
  selector: 'service-desk-ui-category-header',
  templateUrl: './category-header.component.html',
  styleUrls: ['./category-header.component.scss'],
})
export class CategoryHeaderComponent {
  @Input() category: Category;
}

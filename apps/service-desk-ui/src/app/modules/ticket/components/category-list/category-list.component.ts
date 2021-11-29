import { Component, Input } from '@angular/core';

import { Category } from '../../models/category/category.model';
import { Service } from '../../models/service/service.model';
import { contentListAnimation } from '../../../../core/animations/content.animation';

@Component({
  selector: 'service-desk-ui-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
  animations: [contentListAnimation],
})
export class CategoryListComponent {
  @Input() categories: Category[] = [];

  trackByCategory(index: number, category: Category) {
    return category.id;
  }

  trackByService(index: number, service: Service) {
    return service.id;
  }
}

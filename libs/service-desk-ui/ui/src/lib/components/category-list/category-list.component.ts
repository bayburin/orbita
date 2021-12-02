import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { Category, Service } from '@orbita/service-desk-ui/domain-logic';
import { contentListAnimation } from './../../animations/content.animation';

@Component({
  selector: 'lib-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
  animations: [contentListAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryListComponent {
  /**
   * Список категорий
   */
  @Input() categories: Category[];

  trackByCategory(index: number, category: Category) {
    return category.id;
  }

  trackByService(index: number, service: Service) {
    return service.id;
  }
}

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { CategoryVM } from '@orbita/service-desk-ui/domain-logic';
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
  @Input() categories: CategoryVM[];
  /**
   * Флаг, определяющий, нужно ли показывать услуги, привязанные к категориям
   */
  @Input() showServices = false;

  trackByCategory(index: number, category: CategoryVM) {
    return category.id;
  }
}

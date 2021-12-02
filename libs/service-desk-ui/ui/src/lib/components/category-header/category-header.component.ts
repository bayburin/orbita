import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Category } from '@orbita/service-desk-ui/domain-logic';

@Component({
  selector: 'lib-category-header',
  templateUrl: './category-header.component.html',
  styleUrls: ['./category-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryHeaderComponent {
  /**
   * Категория
   */
  @Input() category: Category;
}

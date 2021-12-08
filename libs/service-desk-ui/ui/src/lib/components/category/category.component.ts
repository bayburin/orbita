import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Category } from '@orbita/service-desk-ui/domain-logic';

@Component({
  selector: 'lib-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryComponent {
  /**
   * Категория
   */
  @Input() data: Category;
}

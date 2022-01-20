import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from '@orbita/service-desk-ui/domain-logic';

@Component({
  selector: 'lib-admin-categories-table',
  templateUrl: './admin-categories-table.component.html',
  styleUrls: ['./admin-categories-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminCategoriesTableComponent {
  /**
   * Список категорий
   */
  @Input() categories: Category[];
  /**
   * Список идентификаторов категорий, которые сейчас обрабатываются (грузятся)
   */
  @Input() loadingIds: number[];
  /**
   * Событие открытия формы редактирования записи
   */
  @Output() editForm = new EventEmitter<Category>();
  /**
   * Событие удаления записи
   */
  @Output() remove = new EventEmitter<Category>();
}

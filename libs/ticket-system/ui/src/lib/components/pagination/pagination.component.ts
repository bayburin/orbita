import { Observable, of } from 'rxjs';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'lib-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent {
  /**
   * Индикатор загрузки
   */
  @Input() loading$: Observable<boolean> = of(null);
  /**
   * Номер страницы
   */
  @Input() page$: Observable<number> = of(null);
  /**
   * Общее число записей
   */
  @Input() totalCount$: Observable<number> = of(null);
  /**
   * Максимальный размер записей на странице
   */
  @Input() maxSize$: Observable<number> = of(null);
  /**
   * Событие изменения номера страницы. Возвращает новый номер страницы
   */
  @Output() pageChanged = new EventEmitter<number>();
}

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  templateUrl: './abstract-search-result.component.html',
  styleUrls: ['./abstract-search-result.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AbstractSearchResultComponent<T> {
  /**
   * Режим, при котором ответ на вопрос не выдается, только вопрос с наименованием услуги и ссылка на него
   */
  @Input() standaloneLink = false;
  /**
   * Определяет, показывать ли системные флаги
   */
  @Input() showFlags: boolean;
  /**
   * Объект данных
   */
  @Input() data: T;
}

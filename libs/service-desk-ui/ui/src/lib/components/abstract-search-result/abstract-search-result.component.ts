import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  templateUrl: './abstract-search-result.component.html',
  styleUrls: ['./abstract-search-result.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AbstractSearchResultComponent<T> {
  /**
   * Объект данных
   */
  @Input() data: T;
}

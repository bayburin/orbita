import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Attachment } from '@orbita/service-desk-ui/domain-logic';

import { SearchResultTypes } from '@orbita/service-desk-ui/domain-logic';

@Component({
  selector: 'lib-search-result-list',
  templateUrl: './search-result-list.component.html',
  styleUrls: ['./search-result-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchResultListComponent {
  /**
   * Результаты поиска
   */
  @Input() result: SearchResultTypes[];
  /**
   * Флаг, определяющий, загружены ли данные об ответственных
   */
  @Input() employeeLoaded: boolean;
  /**
   * Список id файлов, которые загружаются в данный момент
   */
  @Input() attachmentLoadingIds: number[];
  /**
   * Событие обновления рейтинга
   */
  @Output() upRating = new EventEmitter<SearchResultTypes>();
  /**
   * Событие загрузки файла
   */
  @Output() downloadAttachment = new EventEmitter<Attachment>();
}

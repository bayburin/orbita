import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

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
}

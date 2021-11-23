import { LazyLoadEvent } from 'primeng/api';
import { Component, OnDestroy } from '@angular/core';
import { SvtFacade, SvtItemViewModel } from '@orbita/orbita-ui/domain-logic';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-svt-items-block',
  templateUrl: './svt-items-block.component.html',
  styleUrls: ['./svt-items-block.component.scss'],
})
export class SvtItemsBlockComponent implements OnDestroy {
  items$ = this.svtFacade.allItems$;
  loading$ = this.svtFacade.loadingItem$;

  constructor(private svtFacade: SvtFacade, private router: Router) {}

  ngOnDestroy(): void {
    this.svtFacade.removeAllItems();
  }

  /**
   * Вызывает метод для поиска новых данных для таблицы
   *
   * @param event - метаданные для загрузки данных таблицы
   */
  changeTable(event: LazyLoadEvent): void {
    this.svtFacade.searchSvtItems(event.filters);
  }

  /**
   * Очищает таблицу
   */
  clearTable(): void {
    this.svtFacade.removeAllItems();
  }

  /**
   * Переходит на страницу создания заявки с выбранной техникой
   *
   * @param employee - выбранный работник
   */
  redirectToNewSdRequestPage(item: SvtItemViewModel) {
    this.router.navigate(['/tickets', 'new-sd-request'], {
      queryParams: { id_tn: item.workplace.id_tn, barcode: item.barcode_item.id },
    });
  }
}

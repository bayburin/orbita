import { Component, OnInit } from '@angular/core';
import { CategoryFacade } from '@orbita/service-desk-ui/domain-logic';

@Component({
  selector: 'service-desk-ui-admin-home-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.scss'],
})
export class AdminCategoriesComponent implements OnInit {
  categories$ = this.categoryFacade.all$;
  loading$ = this.categoryFacade.loading$;
  loaded$ = this.categoryFacade.loaded$;

  constructor(private categoryFacade: CategoryFacade) {}

  ngOnInit(): void {
    this.loadData();
  }

  /**
   * Загружает данные таблицы
   */
  loadData(): void {
    this.categoryFacade.loadAll();
  }

  /**
   * Инициализирует новую форму
   */
  newForm(): void {
    /** */
  }
}

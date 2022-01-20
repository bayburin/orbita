import { Component, OnInit, OnDestroy } from '@angular/core';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { AdminCategoryFacade } from '@orbita/service-desk-ui/domain-logic';
import { Subscription } from 'rxjs';

import { AdminCategoryFormComponent } from '../admin-category-form/admin-category-form.component';

@Component({
  selector: 'service-desk-ui-admin-home-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.scss'],
})
export class AdminCategoriesComponent implements OnInit, OnDestroy {
  categories$ = this.adminCategoryFacade.all$;
  loading$ = this.adminCategoryFacade.loading$;
  loaded$ = this.adminCategoryFacade.loaded$;
  formDisplay$ = this.adminCategoryFacade.formDisplay$;
  subscriptions = new Subscription();
  ref: DynamicDialogRef;

  constructor(private adminCategoryFacade: AdminCategoryFacade, private dialogService: DialogService) {}

  ngOnInit(): void {
    this.loadData();
    this.subscriptions.add(
      this.formDisplay$.subscribe((display) => {
        if (display) {
          this.showForm();
        } else {
          if (this.ref) {
            this.ref.close();
          }
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  /**
   * Загружает данные таблицы
   */
  loadData(): void {
    this.adminCategoryFacade.loadAll();
  }

  /**
   * Инициализирует новую форму
   */
  newForm(): void {
    this.adminCategoryFacade.initForm();
  }

  private showForm() {
    this.ref = this.dialogService.open(AdminCategoryFormComponent, {
      header: 'Категории',
      width: '40vw',
      closeOnEscape: false,
      closable: false,
      baseZIndex: 10000,
    });
  }
}

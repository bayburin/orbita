import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Category, AdminCategoryFacade } from '@orbita/service-desk-ui/domain-logic';
import { ConfirmationService } from 'primeng/api';
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
  loadingIds$ = this.adminCategoryFacade.loadingIds$;
  formDisplay$ = this.adminCategoryFacade.formDisplay$;
  subscriptions = new Subscription();
  ref: DynamicDialogRef;

  constructor(
    private adminCategoryFacade: AdminCategoryFacade,
    private confirmationService: ConfirmationService,
    private dialogService: DialogService
  ) {}

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

  /**
   * Инициализирует форму редактирования записи
   *
   * @param category - категория, которую необходимо редактировать
   */
  editForm(category: Category): void {
    this.adminCategoryFacade.edit(category.id);
  }

  /**
   * Удаляет категорию
   *
   * @param category - категория, которую необходимо удалить
   */
  remove(category: Category): void {
    this.confirmationService.confirm({
      message: `Вы действительно хотите удалить категорию №${category.id} "${category.name}"? Это действие удалит все связанные услуги, вопросы и формы заявок!`,
      header: 'Подтверждение удаления',
      accept: () => this.adminCategoryFacade.destroy(category.id),
    });
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

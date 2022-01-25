import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ServiceOverviewVM, AdminServiceFacade, AdminCategoryFacade } from '@orbita/service-desk-ui/domain-logic';
import { ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';

import { AdminServiceFormComponent } from './../admin-service-form/admin-service-form.component';

@Component({
  selector: 'service-desk-ui-admin-home-admin-services',
  templateUrl: './admin-services.component.html',
  styleUrls: ['./admin-services.component.scss'],
})
export class AdminServicesComponent implements OnInit {
  categories$ = this.adminCategoryFacade.all$;
  services$ = this.adminServiceFacade.all$;
  loading$ = this.adminServiceFacade.loading$;
  loaded$ = this.adminServiceFacade.loaded$;
  loadingIds$ = this.adminServiceFacade.loadingIds$;
  formDisplay$ = this.adminServiceFacade.formDisplay$;
  subscriptions = new Subscription();
  ref: DynamicDialogRef;

  constructor(
    private adminServiceFacade: AdminServiceFacade,
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

  /**
   * Загружает данные таблицы
   */
  loadData(): void {
    this.adminServiceFacade.loadAll();
  }

  /**
   * Инициализирует новую форму
   */
  newForm(): void {
    this.adminServiceFacade.initForm();
  }

  /**
   * Инициализирует форму редактирования записи
   *
   * @param service - услуга, которую необходимо редактировать
   */
  editForm(service: ServiceOverviewVM): void {
    this.adminServiceFacade.edit(service.id);
  }

  /**
   * Удаляет услугу
   *
   * @param service - услуга, которую необходимо удалить
   */
  remove(service: ServiceOverviewVM): void {
    this.confirmationService.confirm({
      message: `Вы действительно хотите удалить услугу №${service.id} "${service.name}"? Это действие удалит все связанные вопросы и формы заявок!`,
      header: 'Подтверждение удаления',
      accept: () => this.adminServiceFacade.destroy(service.id),
    });
  }

  private showForm() {
    this.ref = this.dialogService.open(AdminServiceFormComponent, {
      header: 'Услуги',
      width: '50vw',
      closeOnEscape: false,
      closable: false,
      baseZIndex: 10000,
    });
  }
}

import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ServiceOverviewVM, AdminServiceFacade } from '@orbita/service-desk-ui/domain-logic';
import { ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'service-desk-ui-admin-home-admin-services',
  templateUrl: './admin-services.component.html',
  styleUrls: ['./admin-services.component.scss'],
})
export class AdminServicesComponent implements OnInit {
  services$ = this.adminServiceFacade.all$;
  loading$ = this.adminServiceFacade.loading$;
  loaded$ = this.adminServiceFacade.loaded$;

  constructor(private adminServiceFacade: AdminServiceFacade) {}

  ngOnInit(): void {
    this.adminServiceFacade.loadAll();
  }

  /**
   * Загружает данные таблицы
   */
  loadData(): void {
    this.adminServiceFacade.loadAll();
  }

  /**
   * Инициализирует форму редактирования записи
   *
   * @param service - услуга, которую необходимо редактировать
   */
  editForm(service: ServiceOverviewVM): void {
    /** */
  }

  /**
   * Удаляет услугу
   *
   * @param service - услуга, которую необходимо удалить
   */
  remove(service: ServiceOverviewVM): void {
    /** */
  }

  /**
   * Инициализирует новую форму
   */
  newForm(): void {
    /** */
  }
}

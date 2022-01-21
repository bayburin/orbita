import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Service, AdminServiceFacade } from '@orbita/service-desk-ui/domain-logic';
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
   * Инициализирует новую форму
   */
  newForm(): void {
    /** */
  }
}

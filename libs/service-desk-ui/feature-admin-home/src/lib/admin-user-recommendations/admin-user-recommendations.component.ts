import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserRecommendation, AdminUserRecommendationFacade } from '@orbita/service-desk-ui/domain-logic';
import { ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';

import { AdminUserRecommendationFormComponent } from '../admin-user-recommendation-form/admin-user-recommendation-form.component';

@Component({
  selector: 'service-desk-ui-admin-home-admin-user-recommendations',
  templateUrl: './admin-user-recommendations.component.html',
  styleUrls: ['./admin-user-recommendations.component.scss'],
})
export class AdminUserRecommendationsComponent implements OnInit, OnDestroy {
  userRecommendations$ = this.adminUserRecommendationFacade.all$;
  loading$ = this.adminUserRecommendationFacade.loading$;
  loaded$ = this.adminUserRecommendationFacade.loaded$;
  loadingIds$ = this.adminUserRecommendationFacade.loadingIds$;
  formDisplay$ = this.adminUserRecommendationFacade.formDisplay$;
  subscriptions = new Subscription();
  ref: DynamicDialogRef;

  constructor(
    private adminUserRecommendationFacade: AdminUserRecommendationFacade,
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
    this.adminUserRecommendationFacade.loadAll();
  }

  /**
   * Инициализирует новую форму
   */
  newForm(): void {
    this.adminUserRecommendationFacade.initForm();
  }

  /**
   * Инициализирует форму редактирования записи
   */
  editForm(userRecommendation: UserRecommendation): void {
    this.adminUserRecommendationFacade.edit(userRecommendation.id);
  }

  /**
   * Удаляет запись
   */
  remove(userRecommendation: UserRecommendation): void {
    this.confirmationService.confirm({
      message: `Вы действительно хотите удалить запись №${userRecommendation.id} "${userRecommendation.title}"?`,
      header: 'Подтверждение удаления',
      accept: () => this.adminUserRecommendationFacade.destroy(userRecommendation.id),
    });
  }

  /**
   * Перехватывает событие переноса строки
   *
   * @param event - объект события
   */
  reorderRow(event: { dragIndex: number; dropIndex: number }): void {
    this.adminUserRecommendationFacade.reorder(event.dragIndex, event.dropIndex);
  }

  private showForm() {
    this.ref = this.dialogService.open(AdminUserRecommendationFormComponent, {
      header: 'Рекомендации для пользователя',
      width: '40vw',
      closeOnEscape: false,
      closable: false,
      baseZIndex: 10000,
    });
  }
}

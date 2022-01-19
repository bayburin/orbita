import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import {
  UserRecommendation,
  getUserRecommendationLinkTypes,
  UserRecommendationLinkTypesVM,
} from '@orbita/service-desk-ui/domain-logic';

@Component({
  selector: 'lib-admin-user-recommendations-table',
  templateUrl: './admin-user-recommendations-table.component.html',
  styleUrls: ['./admin-user-recommendations-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminUserRecommendationsTableComponent {
  /**
   * Список рекомендаций
   */
  @Input() userRecommendations: UserRecommendation[];
  /**
   * Список идентификаторов записей, которые сейчас обрабатываются (грузятся)
   */
  @Input() loadingIds: number[];
  /**
   * Событие изменения порядка строк
   */
  @Output() reorderRow = new EventEmitter<{ dragIndex: number; dropIndex: number }>();
  /**
   * Событие открытия формы редактирования записи
   */
  @Output() editForm = new EventEmitter<UserRecommendation>();
  /**
   * Событие удаления записи
   */
  @Output() remove = new EventEmitter<UserRecommendation>();

  /**
   * Возвращает объект-представление для типа ссылки указанной записи
   *
   * @param external - тип ссылки
   */
  linkType(external: boolean): UserRecommendationLinkTypesVM {
    return getUserRecommendationLinkTypes(external);
  }
}

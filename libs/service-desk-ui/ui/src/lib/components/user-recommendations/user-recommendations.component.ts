import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { UserRecommendation } from '@orbita/service-desk-ui/domain-logic';

@Component({
  selector: 'lib-user-recommendations',
  templateUrl: './user-recommendations.component.html',
  styleUrls: ['./user-recommendations.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserRecommendationsComponent {
  /**
   * Список рекомендаций
   */
  @Input() userRecommendations: UserRecommendation[];

  trackByRecommendation(index: number, recommendation: UserRecommendation) {
    return recommendation.id;
  }
}

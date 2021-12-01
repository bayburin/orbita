import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVICE_DESK_UI_ENV_TOKEN, ServiceDeskUiEnvironment } from '@orbita/shared/environment';

import { UserRecommendationApiAbstract } from './user-recommendation.api.abstract';
import { UserRecommendation } from '../../../entities/model/user-recommendation.interface';

/**
 * Содержит API категорий
 */
@Injectable({
  providedIn: 'root',
})
export class UserRecommendationApi implements UserRecommendationApiAbstract {
  readonly api = `${this.env.serverUrl}/user_recommendations`;

  constructor(private http: HttpClient, @Inject(SERVICE_DESK_UI_ENV_TOKEN) private env: ServiceDeskUiEnvironment) {}

  query() {
    return this.http.get<UserRecommendation[]>(this.api);
  }
}

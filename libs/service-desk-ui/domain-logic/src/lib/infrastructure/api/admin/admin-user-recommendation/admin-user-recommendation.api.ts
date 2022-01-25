import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVICE_DESK_UI_ENV_TOKEN, ServiceDeskUiEnvironment } from '@orbita/shared/environment';

import { AdminUserRecommendationApiAbstract } from './admin-user-recommendation.api.abstract';
import { UserRecommendation } from '../../../../entities/models/user-recommendation.interface';

/**
 * Содержит API рекомендаций
 */
@Injectable({
  providedIn: 'root',
})
export class AdminUserRecommendationApi implements AdminUserRecommendationApiAbstract {
  readonly api = `${this.env.serverUrl}/admin/user_recommendations`;

  constructor(private http: HttpClient, @Inject(SERVICE_DESK_UI_ENV_TOKEN) private env: ServiceDeskUiEnvironment) {}

  query() {
    return this.http.get<UserRecommendation[]>(this.api);
  }

  show(id: number) {
    return this.http.get<UserRecommendation>(`${this.api}/${id}`);
  }

  save(formData: UserRecommendation) {
    return this.http.post<UserRecommendation>(this.api, { user_recommendation: formData });
  }

  update(id: number, formData: UserRecommendation) {
    return this.http.put<UserRecommendation>(`${this.api}/${id}`, { user_recommendation: formData });
  }

  destroy(id: number) {
    return this.http.delete<UserRecommendation>(`${this.api}/${id}`);
  }

  reorder(data: { id: number; order: number }[]) {
    return this.http.put<UserRecommendation[]>(`${this.api}/reorder`, { new_orders: data });
  }
}
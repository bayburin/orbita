import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVICE_DESK_UI_ENV_TOKEN, ServiceDeskUiEnvironment } from '@orbita/shared/environment';

import { CategoryApiAbstract } from './category.api.abstract';
import { Category } from '../../../entities/models/category.interface';

/**
 * Содержит API категорий
 */
@Injectable({
  providedIn: 'root',
})
export class CategoryApi implements CategoryApiAbstract {
  readonly api = `${this.env.serverUrl}/categories`;

  constructor(private http: HttpClient, @Inject(SERVICE_DESK_UI_ENV_TOKEN) private env: ServiceDeskUiEnvironment) {}

  query() {
    return this.http.get<Category[]>(this.api);
  }

  show(id: number) {
    return this.http.get<Category>(`${this.api}/${id}`);
  }
}

import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SERVICE_DESK_UI_ENV_TOKEN, ServiceDeskUiEnvironment } from '@orbita/shared/environment';

import { EmployeeApiAbstract } from './employee.api.abstract';
import { EmployeeShort } from '../../../entities/models/employee/employee-short.interface';

/**
 * Содержит API работников
 */
@Injectable({
  providedIn: 'root',
})
export class EmployeeApi implements EmployeeApiAbstract {
  readonly api = `${this.env.serverUrl}/employees`;

  constructor(private http: HttpClient, @Inject(SERVICE_DESK_UI_ENV_TOKEN) private env: ServiceDeskUiEnvironment) {}

  queryByTns(tns: number[]) {
    const params = new HttpParams().set('filters', JSON.stringify({ tns }));

    return this.http.get<EmployeeShort[]>(`${this.api}`, { params });
  }

  search(key: string, value: string) {
    const params = new HttpParams().set('key', key).set('value', value);

    return this.http.get<EmployeeShort[]>(`${this.api}/search`, { params });
  }
}

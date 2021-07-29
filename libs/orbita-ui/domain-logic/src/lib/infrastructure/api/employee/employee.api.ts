import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ORBITA_UI_ENV_TOKEN, OrbitaUiEnvironment } from '@orbita/shared/environment';

import { Employee } from './../../../entities/models/employee/employee.interface';
import { EmployeeApiAbstract } from './employee.api.abstract';
import { EmployeeFilters } from './../../../entities/models/employee/employee-filters.enum';
import { EmployeeShortServerData } from './../../../entities/server-data/employee-server-data.interface';

@Injectable({
  providedIn: 'root',
})
export class EmployeeApi implements EmployeeApiAbstract {
  readonly api = `${this.env.serverApiUrl}/employees`;

  constructor(private http: HttpClient, @Inject(ORBITA_UI_ENV_TOKEN) private env: OrbitaUiEnvironment) {}

  show(idTn: number) {
    return this.http.get<Employee>(`${this.api}/${idTn}`);
  }

  query(key?: EmployeeFilters, value?: string) {
    let params = {};

    if (key) {
      params = new HttpParams().set('key', key).set('value', value);
    }

    return this.http.get<EmployeeShortServerData>(this.api, { params });
  }
}

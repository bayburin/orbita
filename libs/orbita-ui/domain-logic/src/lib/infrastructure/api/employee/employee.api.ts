import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ORBITA_UI_ENV_TOKEN, OrbitaUiEnvironment } from '@orbita/shared/environment';

import { Employee } from './../../../entities/models/employee/employee.interface';
import { EmployeeApiAbstract } from './employee.api.abstract';
import { SearchEmployeeKeys } from './../../../entities/search-employee-keys.enum';
import { EmployeeShort } from './../../../entities/models/employee/employee-short.interface';

@Injectable({
  providedIn: 'root',
})
export class EmployeeApi implements EmployeeApiAbstract {
  readonly api = `${this.env.serverApiUrl}/employees`;

  constructor(private http: HttpClient, @Inject(ORBITA_UI_ENV_TOKEN) private env: OrbitaUiEnvironment) {}

  show(idTn: number) {
    return this.http.get<Employee>(`${this.api}/${idTn}`);
  }

  query(key?: SearchEmployeeKeys, value?: string) {
    let params = {};

    if (key) {
      params = new HttpParams().set('key', key).set('value', value);
    }

    return this.http.get<EmployeeShort[]>(this.api, { params });
  }
}

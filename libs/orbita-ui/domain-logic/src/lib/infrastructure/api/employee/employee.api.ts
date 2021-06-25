import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ORBITA_UI_ENV_TOKEN, OrbitaUiEnvironment } from '@orbita/shared/environment';

import { EmployeeServerData } from './../../../entities/server-data/employee-server-data.interface';
import { EmployeeApiAbstract } from './employee.api.abstract';

@Injectable({
  providedIn: 'root',
})
export class EmployeeApi implements EmployeeApiAbstract {
  readonly api = `${this.env.serverApiUrl}/employees`;

  constructor(private http: HttpClient, @Inject(ORBITA_UI_ENV_TOKEN) private env: OrbitaUiEnvironment) {}

  show(idTn: number) {
    return this.http.get<EmployeeServerData>(`${this.api}/${idTn}`);
  }
}

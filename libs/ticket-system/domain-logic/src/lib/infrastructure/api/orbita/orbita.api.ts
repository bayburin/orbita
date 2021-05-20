import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ORBITA_UI_ENV_TOKEN, OrbitaUiEnvironment } from '@orbita/shared/environment';

import { OrbitaApiAbstract } from './orbita.api.abstract';
import { Init } from './../../../entities/server-data/init.interface';

@Injectable({
  providedIn: 'root'
})
export class OrbitaApi implements OrbitaApiAbstract {
  readonly api = this.env.serverApiUrl;

  constructor(
    private http: HttpClient,
    @Inject(ORBITA_UI_ENV_TOKEN) private env: OrbitaUiEnvironment
  ) { }

  init() {
    return this.http.get<Init>(`${this.api}/init`);
  }
}

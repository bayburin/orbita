import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ORBITA_UI_ENV_TOKEN, OrbitaUiEnvironment } from '@orbita/shared/environment';
import { delay } from 'rxjs/operators';

import { AppApiAbstract } from './app.api.abstract';
import { InitServerData } from './../../../entities/server-data/init.interface';

/**
 * Содержит API для обращения к серверу орбиты в случаях, когда они не связаны с какими-то конкретными сущностями
 */
@Injectable({
  providedIn: 'root',
})
export class AppApi implements AppApiAbstract {
  readonly api = this.env.serverApiUrl;

  constructor(private http: HttpClient, @Inject(ORBITA_UI_ENV_TOKEN) private env: OrbitaUiEnvironment) {}

  init() {
    return this.http.get<InitServerData>(`${this.api}/init`).pipe(delay(500));
  }
}

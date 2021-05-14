import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ORBITA_UI_ENV_TOKEN, OrbitaUiEnvironment } from '@orbita/shared/environment';

import { UserQueue } from './../../../entities/user-queue.interface';
import { UserApiAbstract } from './user.api.abstract';

@Injectable({
  providedIn: 'root'
})
export class UserApi implements UserApiAbstract {
  readonly api = `${this.env.serverApiUrl}/users`;

  constructor(
    private http: HttpClient,
    @Inject(ORBITA_UI_ENV_TOKEN) private env: OrbitaUiEnvironment
  ) { }

  query() {
    return this.http.get<UserQueue>(this.api);
  }
}

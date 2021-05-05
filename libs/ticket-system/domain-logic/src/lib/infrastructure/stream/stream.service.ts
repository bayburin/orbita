import { Inject, Injectable } from '@angular/core';
import { ActionCableService, Cable } from 'angular2-actioncable';
import { AuthHelper } from '@iss/ng-auth-center';
import { ORBITA_UI_ENV_TOKEN, OrbitaUiEnvironment } from '@orbita/shared/environment';

@Injectable({
  providedIn: 'root'
})
export class StreamService {
  cable: Cable;

  constructor(
    private cableService: ActionCableService,
    private authHelper: AuthHelper,
    @Inject(ORBITA_UI_ENV_TOKEN) private env: OrbitaUiEnvironment
  ) {
    const jwt = this.authHelper.getRawJwt();
    this.cable = this.cableService.cable(env.actionCableUrl, { access_token: jwt });
  }
}

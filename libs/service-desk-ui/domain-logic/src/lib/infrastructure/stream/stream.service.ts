import { Inject, Injectable } from '@angular/core';
import { ActionCableService, Cable } from 'angular2-actioncable';
import { AuthHelper } from '@iss/ng-auth-center';
import { SERVICE_DESK_UI_ENV_TOKEN, ServiceDeskUiEnvironment } from '@orbita/shared/environment';

import { StreamServiceAbstract } from './stream.service.abstract';

@Injectable({
  providedIn: 'root',
})
export class StreamService implements StreamServiceAbstract {
  cable: Cable;

  constructor(
    private cableService: ActionCableService,
    private authHelper: AuthHelper,
    @Inject(SERVICE_DESK_UI_ENV_TOKEN) private env: ServiceDeskUiEnvironment
  ) {
    const jwt = this.authHelper.getRawJwt();
    this.cable = this.cableService.cable(env.actionCableUrl, {
      access_token: jwt,
    });
  }
}

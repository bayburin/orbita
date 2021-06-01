import { TestBed } from '@angular/core/testing';
import { ActionCableService } from 'angular2-actioncable';
import { AuthHelper, AuthHelperStub } from '@iss/ng-auth-center';
import {
  ORBITA_UI_ENV_TOKEN,
  OrbitaUiEnvironment,
  orbitaUiEnvironmentStub,
} from '@orbita/shared/environment';

import { StreamService } from './stream.service';

describe('StreamService', () => {
  let service: StreamService;
  let env: OrbitaUiEnvironment;
  let authHelper: AuthHelper;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ActionCableService,
        { provide: AuthHelper, useClass: AuthHelperStub },
        { provide: ORBITA_UI_ENV_TOKEN, useValue: orbitaUiEnvironmentStub },
      ],
    });

    service = TestBed.inject(StreamService);
    env = TestBed.inject(ORBITA_UI_ENV_TOKEN);
    authHelper = TestBed.inject(AuthHelper);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should sets server url into channelServer variable', () => {
    expect(service.cable.url).toEqual(env.actionCableUrl);
  });

  it('should sets access token into channelServer variable', () => {
    expect(service.cable.params).toEqual({
      access_token: authHelper.getRawJwt(),
    });
  });
});

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SERVICE_DESK_UI_ENV_TOKEN, serviceDeskUiEnvironmentStub } from '@orbita/shared/environment';

import { AppApi } from './app.api';

describe('AppApi', () => {
  let service: AppApi;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AppApi,
        {
          provide: SERVICE_DESK_UI_ENV_TOKEN,
          useValue: serviceDeskUiEnvironmentStub,
        },
      ],
    });

    service = TestBed.inject(AppApi);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('init()', () => {
    const api = `${serviceDeskUiEnvironmentStub.serverUrl}/init`;
    const initData = {
      date: new Date(),
    };

    it('should return requests', () => {
      service.init().subscribe((result) => {
        expect(result).toEqual(initData);
      });

      httpMock
        .expectOne({
          method: 'GET',
          url: api,
        })
        .flush(initData);
    });
  });

  describe('appVersion()', () => {
    const api = serviceDeskUiEnvironmentStub.versionCheckURL;
    const version = {
      version: '123',
      hash: 'asdasd123123',
    };

    it('should return requests', () => {
      service.appVersion().subscribe((result) => {
        expect(result).toEqual(version);
      });

      httpMock
        .expectOne({
          method: 'GET',
          url: api,
        })
        .flush(version);
    });
  });
});

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ORBITA_UI_ENV_TOKEN, orbitaUiEnvironmentStub } from '@orbita/shared/environment';

import { AppApi } from './app.api';
import { Group } from './../../../entities/models/group.interface';
import { User } from './../../../entities/models/user.interface';

describe('AppApi', () => {
  let service: AppApi;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AppApi,
        {
          provide: ORBITA_UI_ENV_TOKEN,
          useValue: orbitaUiEnvironmentStub,
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
    const api = `${orbitaUiEnvironmentStub.serverApiUrl}/init`;
    const initData = {
      groups: [] as Group[],
      users: [] as User[],
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
});

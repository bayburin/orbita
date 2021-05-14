import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ORBITA_UI_ENV_TOKEN } from '@orbita/shared/environment';

import { UserApi } from './user.api';

describe('UserApi', () => {
  let service: UserApi;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        UserApi,
        { provide: ORBITA_UI_ENV_TOKEN, useValue: { serverApiUrl: 'http://test'  } }
      ]
    });

    service = TestBed.inject(UserApi);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#query', () => {
    const api = 'http://test/users';
    const users = [{ id: 1 }, { id: 2 }];

    it('should return requests', () => {
      service.query().subscribe(result => {
        expect(result).toEqual(users);
      })

      httpMock.expectOne({
        method: 'GET',
        url: api
      }).flush(users);
    });
  });
});

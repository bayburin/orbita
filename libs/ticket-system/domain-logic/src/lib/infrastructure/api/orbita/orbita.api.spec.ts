import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ORBITA_UI_ENV_TOKEN } from '@orbita/shared/environment';

import { OrbitaApi } from './orbita.api';
import { Group } from './../../../entities/models/group.interface';
import { User } from './../../../entities/models/user.interface';

describe('OrbitaApi', () => {
  let service: OrbitaApi;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OrbitaApi,
        { provide: ORBITA_UI_ENV_TOKEN, useValue: { serverApiUrl: 'http://test'  } }
      ]
    });

    service = TestBed.inject(OrbitaApi);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('init()', () => {
    const api = 'http://test/init';
    const initData = {
      groups: [] as Group[],
      users: [] as User[]
    };

    it('should return requests', () => {
      service.init().subscribe(result => {
        expect(result).toEqual(initData);
      });

      httpMock.expectOne({
        method: 'GET',
        url: api
      }).flush(initData);
    });
  });
});

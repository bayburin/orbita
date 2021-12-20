import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SERVICE_DESK_UI_ENV_TOKEN, serviceDeskUiEnvironmentStub } from '@orbita/shared/environment';

import { KaseApi } from './kase.api';
import { KaseQueryResult } from './../../../entities/server-data/kase-query-result.interface';
import { KaseFilter } from '../../../entities/view-models/kase-filters.interface';

describe('KaseApi', () => {
  let service: KaseApi;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        KaseApi,
        {
          provide: SERVICE_DESK_UI_ENV_TOKEN,
          useValue: serviceDeskUiEnvironmentStub,
        },
      ],
    });

    service = TestBed.inject(KaseApi);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('query()', () => {
    const api = `${serviceDeskUiEnvironmentStub.serverUrl}/apps`;
    const filters: KaseFilter = {} as KaseFilter;
    const result: KaseQueryResult = {
      apps: [],
      statuses: [],
    };

    it('should return kases', () => {
      service.query(filters).subscribe((result) => {
        expect(result).toEqual(result);
      });

      httpMock
        .expectOne({
          method: 'GET',
          url: `${api}?filters=%7B%7D`,
        })
        .flush(result);
    });
  });

  describe('revoke()', () => {
    const api = `${serviceDeskUiEnvironmentStub.serverUrl}/apps`;
    const id = 123;

    it('should revoke kase', () => {
      service.revoke(id).subscribe();

      httpMock.expectOne({
        method: 'DELETE',
        url: `${api}/${id}`,
      });
    });
  });

  describe('update()', () => {
    const api = `${serviceDeskUiEnvironmentStub.serverUrl}/apps`;
    const id = 123;
    const body = { rating: 2 };

    it('should revoke kase', () => {
      service.update(id, body).subscribe();

      httpMock.expectOne({
        method: 'PUT',
        url: `${api}/${id}`,
      });
    });
  });
});

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SERVICE_DESK_UI_ENV_TOKEN, serviceDeskUiEnvironmentStub } from '@orbita/shared/environment';

import { Home } from '../../../entities/server-data/home.interface';
import { HomeApi } from './home.api';

describe('HomeApi', () => {
  let service: HomeApi;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HomeApi,
        {
          provide: SERVICE_DESK_UI_ENV_TOKEN,
          useValue: serviceDeskUiEnvironmentStub,
        },
      ],
    });

    service = TestBed.inject(HomeApi);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('query()', () => {
    const api = `${serviceDeskUiEnvironmentStub.serverUrl}/dashboard`;
    const data = {} as Home;

    it('should return home data', () => {
      service.loadHomeData().subscribe((result) => {
        expect(result).toEqual(data);
      });

      httpMock
        .expectOne({
          method: 'GET',
          url: api,
        })
        .flush(data);
    });
  });

  describe('search()', () => {
    const api = `${serviceDeskUiEnvironmentStub.serverUrl}/dashboard/search`;
    const data = {} as Home;

    it('should return finded categories, services and questions', () => {
      service.search('term').subscribe((result) => {
        expect(result).toEqual(data);
      });

      httpMock
        .expectOne({
          method: 'GET',
          url: `${api}?search=term`,
        })
        .flush(data);
    });
  });

  describe('deepSearch()', () => {
    const api = `${serviceDeskUiEnvironmentStub.serverUrl}/dashboard/deep_search`;
    const data = {} as Home;

    it('should return finded categories, services and questions', () => {
      service.deepSearch('term').subscribe((result) => {
        expect(result).toEqual(data);
      });

      httpMock
        .expectOne({
          method: 'GET',
          url: `${api}?search=term`,
        })
        .flush(data);
    });
  });
});

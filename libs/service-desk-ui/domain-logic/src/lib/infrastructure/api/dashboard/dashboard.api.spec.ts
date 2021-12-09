import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SERVICE_DESK_UI_ENV_TOKEN, serviceDeskUiEnvironmentStub } from '@orbita/shared/environment';

import { Dashboard } from './../../../entities/server-data/dashboard.interface';
import { DashboardApi } from './dashboard.api';

describe('DashboardApi', () => {
  let service: DashboardApi;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        DashboardApi,
        {
          provide: SERVICE_DESK_UI_ENV_TOKEN,
          useValue: serviceDeskUiEnvironmentStub,
        },
      ],
    });

    service = TestBed.inject(DashboardApi);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('query()', () => {
    const api = `${serviceDeskUiEnvironmentStub.serverUrl}/dashboard`;
    const data = {} as Dashboard;

    it('should return dashboard data', () => {
      service.loadDashboardData().subscribe((result) => {
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
    const data = {} as Dashboard;

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
});

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SERVICE_DESK_UI_ENV_TOKEN, serviceDeskUiEnvironmentStub } from '@orbita/shared/environment';

import { AdminHome } from './../../../../entities/server-data/admin-home.interface';
import { AdminHomeApi } from './admin-home.api';

describe('AdminHomeApi', () => {
  let service: AdminHomeApi;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AdminHomeApi,
        {
          provide: SERVICE_DESK_UI_ENV_TOKEN,
          useValue: serviceDeskUiEnvironmentStub,
        },
      ],
    });

    service = TestBed.inject(AdminHomeApi);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('loadHomeData()', () => {
    const api = `${serviceDeskUiEnvironmentStub.serverUrl}/admin/home`;
    const data = {} as AdminHome;

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
});

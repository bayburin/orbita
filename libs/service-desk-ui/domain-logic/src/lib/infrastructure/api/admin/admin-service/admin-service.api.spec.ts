import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SERVICE_DESK_UI_ENV_TOKEN, serviceDeskUiEnvironmentStub } from '@orbita/shared/environment';

import { AdminServiceApi } from './admin-service.api';

describe('AdminServiceApi', () => {
  let adminService: AdminServiceApi;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AdminServiceApi,
        {
          provide: SERVICE_DESK_UI_ENV_TOKEN,
          useValue: serviceDeskUiEnvironmentStub,
        },
      ],
    });

    adminService = TestBed.inject(AdminServiceApi);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(adminService).toBeTruthy();
  });

  describe('query()', () => {
    const api = `${serviceDeskUiEnvironmentStub.serverUrl}/admin/services`;
    const services = [{ id: 1 }, { id: 2 }];

    it('should return services', () => {
      adminService.query().subscribe((result) => {
        expect(result).toEqual(services);
      });

      httpMock
        .expectOne({
          method: 'GET',
          url: api,
        })
        .flush(services);
    });
  });

  describe('show()', () => {
    const api = `${serviceDeskUiEnvironmentStub.serverUrl}/admin/services/1`;
    const service = { id: 1 };

    it('should return service', () => {
      adminService.show(1).subscribe((result) => {
        expect(result).toEqual(service);
      });

      httpMock
        .expectOne({
          method: 'GET',
          url: api,
        })
        .flush(service);
    });
  });
});

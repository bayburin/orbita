import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SERVICE_DESK_UI_ENV_TOKEN, serviceDeskUiEnvironmentStub } from '@orbita/shared/environment';

import { AdminServiceApi } from './admin-service.api';
import { Service } from '../../../../entities/models/service.interface';
import { ServiceForm } from '../../../../entities/form/service-form.interface';

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

  describe('edit()', () => {
    const api = `${serviceDeskUiEnvironmentStub.serverUrl}/admin/services/1/edit`;
    const service = { id: 1 };

    it('should return service', () => {
      adminService.edit(1).subscribe((result) => {
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

  describe('save()', () => {
    const api = `${serviceDeskUiEnvironmentStub.serverUrl}/admin/services`;
    const formData = { name: 'form-name' } as ServiceForm;
    const service = { name: 'test' } as Service;

    it('should save record', () => {
      adminService.save(formData).subscribe((result) => expect(result).toEqual(service));

      httpMock
        .expectOne({
          method: 'POST',
          url: api,
        })
        .flush(service);
    });
  });

  describe('update()', () => {
    const api = `${serviceDeskUiEnvironmentStub.serverUrl}/admin/services/1`;
    const formData = { name: 'form-name' } as ServiceForm;
    const service = { name: 'test' } as Service;

    it('should update record', () => {
      adminService.update(1, formData).subscribe((result) => expect(result).toEqual(service));

      httpMock
        .expectOne({
          method: 'PUT',
          url: api,
        })
        .flush(service);
    });
  });

  describe('destroy()', () => {
    const api = `${serviceDeskUiEnvironmentStub.serverUrl}/admin/services/1`;
    const service = { name: 'test' } as Service;

    it('should destroy record', () => {
      adminService.destroy(1).subscribe((result) => expect(result).toEqual(service));

      httpMock
        .expectOne({
          method: 'DELETE',
          url: api,
        })
        .flush(service);
    });
  });
});

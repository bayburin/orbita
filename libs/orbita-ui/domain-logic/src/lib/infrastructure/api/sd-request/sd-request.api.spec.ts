import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ORBITA_UI_ENV_TOKEN, orbitaUiEnvironmentStub } from '@orbita/shared/environment';

import { SdRequestApi } from './sd-request.api';
import { SdRequestForm } from './../../../entities/forms/sd-request-form.interface';

describe('SdRequestApi', () => {
  let service: SdRequestApi;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        SdRequestApi,
        {
          provide: ORBITA_UI_ENV_TOKEN,
          useValue: orbitaUiEnvironmentStub,
        },
      ],
    });

    service = TestBed.inject(SdRequestApi);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('query()', () => {
    const api = `${orbitaUiEnvironmentStub.serverApiUrl}/sd_requests`;
    const sdRequests = [{ id: 1 }, { id: 2 }];

    it('should return requests', () => {
      service.query(1, 2, {}).subscribe((result) => {
        expect(result).toEqual(sdRequests);
      });

      httpMock
        .expectOne({
          method: 'GET',
          url: `${api}?page=1&perPage=2&filters=%7B%7D`,
        })
        .flush(sdRequests);
    });
  });

  describe('show()', () => {
    const api = `${orbitaUiEnvironmentStub.serverApiUrl}/sd_requests/1`;
    const sdRequest = { id: 1 };

    it('should return request', () => {
      service.show(1).subscribe((result) => {
        expect(result).toEqual(sdRequest);
      });

      httpMock
        .expectOne({
          method: 'GET',
          url: api,
        })
        .flush(sdRequest);
    });
  });

  describe('update()', () => {
    const api = `${orbitaUiEnvironmentStub.serverApiUrl}/sd_requests/1`;
    const sdRequest = { id: 1 } as SdRequestForm;

    it('should return request', () => {
      service.update(1, sdRequest).subscribe((result) => {
        expect(result).toEqual(sdRequest);
      });

      httpMock
        .expectOne({
          method: 'PUT',
          url: api,
        })
        .flush(sdRequest);
    });
  });
});

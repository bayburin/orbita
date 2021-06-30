import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ORBITA_UI_ENV_TOKEN, orbitaUiEnvironmentStub } from '@orbita/shared/environment';

import { AuthCenterApi } from './auth-center.api';
import { HostFilterBuilder } from './../../builders/host-filter.builder';

describe('AuthCenterApi', () => {
  let service: AuthCenterApi;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthCenterApi,
        {
          provide: ORBITA_UI_ENV_TOKEN,
          useValue: orbitaUiEnvironmentStub,
        },
      ],
    });

    service = TestBed.inject(AuthCenterApi);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('showHost()', () => {
    const api = `${orbitaUiEnvironmentStub.serverApiUrl}/auth-center/show_host`;
    const host = { id: '123' };

    it('should return free_sd_request_types', () => {
      const filter = new HostFilterBuilder().idField('name').id('fake-name').build();

      service.showHost(filter).subscribe((result) => {
        expect(result).toEqual(host);
      });

      httpMock
        .expectOne({
          method: 'GET',
          url: `${api}?idfield=name&id=fake-name`,
        })
        .flush(host);
    });
  });
});

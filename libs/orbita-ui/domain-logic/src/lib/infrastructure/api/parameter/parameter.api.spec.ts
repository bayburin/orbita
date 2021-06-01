import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ORBITA_UI_ENV_TOKEN } from '@orbita/shared/environment';

import { ParameterApi } from './parameter.api';
import { Parameter } from './../../../entities/models/parameter.interface';

describe('ParameterApi', () => {
  let service: ParameterApi;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ParameterApi,
        {
          provide: ORBITA_UI_ENV_TOKEN,
          useValue: { serverApiUrl: 'http://test' },
        },
      ],
    });

    service = TestBed.inject(ParameterApi);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('query()', () => {
    const api = 'http://test/parameters';
    const response = { parameters: [] as Parameter[] };

    it('should return requests', () => {
      service.query(1).subscribe((result) => {
        expect(result).toEqual(response);
      });

      httpMock
        .expectOne({
          method: 'GET',
          url: `${api}?claim_id=1`,
        })
        .flush(response);
    });
  });
});

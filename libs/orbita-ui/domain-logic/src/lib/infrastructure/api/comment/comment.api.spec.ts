import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ORBITA_UI_ENV_TOKEN, orbitaUiEnvironmentStub } from '@orbita/shared/environment';

import { CommentApi } from './comment.api';

describe('CommentApi', () => {
  let service: CommentApi;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CommentApi,
        {
          provide: ORBITA_UI_ENV_TOKEN,
          useValue: orbitaUiEnvironmentStub,
        },
      ],
    });

    service = TestBed.inject(CommentApi);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('create()', () => {
    const api = `${orbitaUiEnvironmentStub.serverApiUrl}/claims/12/comments`;
    const response = { message: 'ok' };

    it('should return request', () => {
      service.create(12, 'test').subscribe((result) => {
        expect(result).toEqual(response);
      });

      httpMock
        .expectOne({
          method: 'POST',
          url: api,
        })
        .flush(response);
    });
  });
});

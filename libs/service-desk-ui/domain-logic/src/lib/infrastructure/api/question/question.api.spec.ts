import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SERVICE_DESK_UI_ENV_TOKEN, serviceDeskUiEnvironmentStub } from '@orbita/shared/environment';

import { QuestionApi } from './question.api';

describe('QuestionApi', () => {
  let question: QuestionApi;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        QuestionApi,
        {
          provide: SERVICE_DESK_UI_ENV_TOKEN,
          useValue: serviceDeskUiEnvironmentStub,
        },
      ],
    });

    question = TestBed.inject(QuestionApi);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(question).toBeTruthy();
  });

  describe('upRating()', () => {
    const api = `${serviceDeskUiEnvironmentStub.serverUrl}/services/1/questions/2/raise_rating`;

    it('should return question', () => {
      question.upRating(2, 1).subscribe();

      httpMock.expectOne({
        method: 'POST',
        url: api,
      });
    });
  });
});

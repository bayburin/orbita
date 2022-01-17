import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SERVICE_DESK_UI_ENV_TOKEN, serviceDeskUiEnvironmentStub } from '@orbita/shared/environment';

import { UserRecommendationApi } from './user-recommendation.api';
import { UserRecommendation } from './../../../entities/models/user-recommendation.interface';

describe('CategoryApi', () => {
  let service: UserRecommendationApi;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        UserRecommendationApi,
        {
          provide: SERVICE_DESK_UI_ENV_TOKEN,
          useValue: serviceDeskUiEnvironmentStub,
        },
      ],
    });

    service = TestBed.inject(UserRecommendationApi);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('query()', () => {
    const api = `${serviceDeskUiEnvironmentStub.serverUrl}/user_recommendations`;
    const categories = [{ id: 1 }, { id: 2 }];

    it('should return user recommendations', () => {
      service.query().subscribe((result) => {
        expect(result).toEqual(categories);
      });

      httpMock
        .expectOne({
          method: 'GET',
          url: api,
        })
        .flush(categories);
    });
  });

  describe('save()', () => {
    const api = `${serviceDeskUiEnvironmentStub.serverUrl}/user_recommendations`;
    const data = { title: 'test' } as UserRecommendation;

    it('should save record', () => {
      service.save(data).subscribe();

      httpMock.expectOne({
        method: 'POST',
        url: api,
      });
    });
  });
});

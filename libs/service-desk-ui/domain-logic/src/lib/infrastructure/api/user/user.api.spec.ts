import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SERVICE_DESK_UI_ENV_TOKEN, serviceDeskUiEnvironmentStub } from '@orbita/shared/environment';

import { UserApi } from './user.api';

describe('UserApi', () => {
  let service: UserApi;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        UserApi,
        {
          provide: SERVICE_DESK_UI_ENV_TOKEN,
          useValue: serviceDeskUiEnvironmentStub,
        },
      ],
    });

    service = TestBed.inject(UserApi);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('loadNotifications()', () => {
    const api = `${serviceDeskUiEnvironmentStub.serverUrl}/users/notifications`;
    const notifications = [{ id: 1 }, { id: 2 }];

    it('should return notifications', () => {
      service.loadNotifications(5).subscribe((result) => {
        expect(result).toEqual(notifications);
      });

      httpMock
        .expectOne({
          method: 'GET',
          url: `${api}?limit=5`,
        })
        .flush(notifications);
    });
  });

  describe('loadNewNotifications()', () => {
    const api = `${serviceDeskUiEnvironmentStub.serverUrl}/users/new_notifications`;
    const notifications = [{ id: 1 }];

    it('should return new notifications', () => {
      service.loadNewNotifications(5).subscribe((result) => {
        expect(result).toEqual(notifications);
      });

      httpMock
        .expectOne({
          method: 'GET',
          url: `${api}?limit=5`,
        })
        .flush(notifications);
    });
  });
});

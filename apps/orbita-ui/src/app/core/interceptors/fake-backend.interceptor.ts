import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { materialize, dematerialize, delay } from 'rxjs/operators';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const users = [
      {
        id: 2,
        role_id: 1,
        group_id: 1,
        tn: 17664,
        id_tn: 12880,
        login: 'BayburinRF',
        fio: 'Байбурин Равиль Фаильевич',
        work_tel: '84-29',
        mobile_tel: '',
        email: 'bayburin@iss-reshetnev.ru'
      },
      {
        id: 3,
        role_id: 1,
        group_id: 2,
        tn: 24125,
        id_tn: 2709,
        login: 'DryannyhAG',
        fio: 'Дрянных Алексей Геннадьевич',
        work_tel: '24-80',
        mobile_tel: '',
        email: 'drag@iss-reshetnev.ru'
      },
      {
        id: 4,
        role_id: 1,
        group_id: 1,
        tn: 15173,
        id_tn: 20092,
        login: 'SilchenkoDM',
        fio: 'Сильченко Дмитрий Михайлович',
        work_tel: '28-74',
        mobile_tel: '',
        email: 'dmitry@iss-reshetnev.ru'
      }
    ];

    const groups = [
      {
        id: 1,
        department_id: 3,
        name: '7141',
        description: 'Сектор ИТ'
      },
      {
        id: 2,
        department_id: 3,
        name: '7142',
        description: 'Ремонт ВТ'
      }
    ]

    const sdRequests = {
      sd_requests: [
        {
          id: 1,
          integration_id: 2,
          application_name: 'Astraea',
          service_id: 3,
          service_name: 'Локальная сеть',
          ticket_identity: 4,
          ticket_name: 'Обращение в техподдержку',
          type: 'sd_request',
          description: 'Тестовое описание',
          status: 'opened',
          priority: 'default',
          runtime: {
            created_at: '2021-05-22 15:00:00 +0700',
            updated_at: '2021-05-24 23:18:49 +0700',
            finished_at_plan: '2021-05-29 15:00:00 +0700',
            finished_at: null
          },
          comments: [
            {
              id: 1,
              claim_id: 1,
              sender_id: 2,
              type: 'comment',
              message: 'Первый комментарий',
              created_at: '2021-05-24 23:16:49 +0700'
            },
            {
              id: 2,
              claim_id: 1,
              sender_id: 3,
              type: 'comment',
              message: 'Второй комментарий',
              created_at: '2021-05-24 23:18:49 +0700'
            }
          ],
          parameters: [],
          works: [
            {
              id: 1,
              claim_id: 1,
              group_id: 1
            }
          ]
        }
      ],
      meta: {
        current_page: 1,
        total_count: 20
      }
    };

    if (req.url.endsWith('v1/sd_requests')) {
      return of(new HttpResponse({ body: sdRequests, status: 200 }))
    }

    if (req.url.endsWith('/init')) {
      return of(new HttpResponse({ body: { users, groups }, status: 200 }))
    }

    return next.handle(req).pipe(
      materialize(),
      delay(1500),
      dematerialize()
    );
  }
}

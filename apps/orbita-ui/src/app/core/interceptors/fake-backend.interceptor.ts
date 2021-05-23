import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { materialize, dematerialize, delay } from 'rxjs/operators';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
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
            created_at: null,
            updated_at: null,
            finished_at_plan: null,
            finished_at: null
          },
          comments: [],
          parameters: [],
          works: []
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

    return next.handle(req).pipe(
      materialize(),
      delay(1500),
      dematerialize()
    );
  }
}

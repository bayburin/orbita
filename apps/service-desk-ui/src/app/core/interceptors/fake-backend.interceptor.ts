import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { mergeMap, delay, materialize, dematerialize } from 'rxjs/operators';

// function makeid(length: number) {
//   let result = '';
//   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//   const charactersLength = characters.length;
//   for (let i = 0; i < length; i++) {
//     result += characters.charAt(Math.floor(Math.random() * charactersLength));
//   }
//   return result;
// }

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const userInfo = {
      fio: 'Форточкина Клавдия Ивановна',
      tn: 100123,
      tel: '41-85',
      dept: 714,
      email: 'fortochkina',
    };

    // if (req.url.endsWith('auth/token') && req.method === 'POST') {
    //   // return of(new HttpResponse({ body: testToken, status: 200 }));
    //   return throwError({ error: { message: 'Unauthorized' } });
    // }

    // if (req.url.endsWith('users/info') && req.method === 'GET') {
    //   // return of(new HttpResponse({ body: userInfo, status: 200 }));
    //   return throwError({ error: { message: 'Unauthorized' } });
    // }

    // if (req.url.endsWith('dashboard')) {
    //   const body = {
    //     categories: [],
    //     services: [],
    //     user_recommendations: [
    //       {
    //         id: 1,
    //         title: 'Тестовая ссылка',
    //         external: false,
    //         link: '/categories/2/services/71',
    //         query_params: { ticket: 481, test: 'param' },
    //         order: 10
    //       },
    //       {
    //         id: 2,
    //         title: 'Ссылка без параметров',
    //         external: false,
    //         link: '/categories/2/services/71',
    //         query_params: null,
    //         order: 20
    //       },
    //       {
    //         id: 3,
    //         title: 'Внешняя ссылка',
    //         external: true,
    //         link: 'http://cosmos',
    //         query_params: null,
    //         order: 30
    //       }
    //     ]
    //   };

    //   return of(new HttpResponse({ body, status: 200 }));
    // }

    // const body = { version: '2.0.2', hash: makeid(10) };
    const body = { version: '2.0.2', hash: '7c62287bc8b04d26b9b0' };

    if (req.url.endsWith('version.json')) {
      return of(new HttpResponse({ body, status: 200 }));
    }

    return next.handle(req).pipe(materialize(), delay(1500), dematerialize());

    // return next.handle(req);
  }
}

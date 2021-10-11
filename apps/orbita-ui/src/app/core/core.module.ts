import { OrbitaUiUiModule } from '@orbita/orbita-ui/ui';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthCenterModule } from '@iss/ng-auth-center';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ActionCableService } from 'angular2-actioncable';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';

import { environment } from '../../environments/environment';
import { ORBITA_UI_ENV_TOKEN } from '@orbita/shared/environment';
import { JsonInterceptor } from './interceptors/json.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { FakeBackendInterceptor } from './interceptors/fake-backend.interceptor';

@NgModule({
  imports: [
    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({ router: routerReducer }),
    EffectsModule.forRoot(),
    StoreRouterConnectingModule.forRoot(),
    environment.production ? [] : StoreDevtoolsModule.instrument({ maxAge: 25 }),
    AuthCenterModule.forRoot(environment.auth),
    OrbitaUiUiModule,
  ],
  providers: [
    { provide: ORBITA_UI_ENV_TOKEN, useValue: environment },
    // { provide: HTTP_INTERCEPTORS, useClass: JsonInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: FakeBackendInterceptor, multi: true },
    MessageService,
    ActionCableService,
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule уже загружен. Он должен быть импортирован только в AppModule');
    }
  }
}

import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthCenterModule } from '@iss/ng-auth-center';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ActionCableService } from 'angular2-actioncable';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { environment } from '../../environments/environment';
import { ORBITA_UI_ENV_TOKEN } from '@orbita/shared/environment';
import { JsonInterceptor } from './interceptors/json.interceptor';
import { FakeBackendInterceptor } from './interceptors/fake-backend.interceptor';

@NgModule({
  imports: [
    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot(),
    environment.production ? [] : StoreDevtoolsModule.instrument({ maxAge: 25 }),
    AuthCenterModule.forRoot(environment.auth),
  ],
  providers: [
    { provide: ORBITA_UI_ENV_TOKEN, useValue: environment },
    { provide: HTTP_INTERCEPTORS, useClass: JsonInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: FakeBackendInterceptor, multi: true },
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

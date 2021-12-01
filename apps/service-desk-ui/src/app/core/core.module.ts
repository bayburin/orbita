import { NgModule, Optional, SkipSelf } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthCenterModule } from '@iss/ng-auth-center';

import { environment } from '../../environments/environment';
import { SERVICE_DESK_UI_ENV_TOKEN } from '@orbita/shared/environment';

@NgModule({
  imports: [
    StoreModule.forRoot({ router: routerReducer }),
    EffectsModule.forRoot(),
    StoreRouterConnectingModule.forRoot(),
    environment.production ? [] : StoreDevtoolsModule.instrument({ maxAge: 25 }),
  ],
  providers: [{ provide: SERVICE_DESK_UI_ENV_TOKEN, useValue: environment }],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule уже загружен. Он должен быть импортирован только в AppModule');
    }
  }
}

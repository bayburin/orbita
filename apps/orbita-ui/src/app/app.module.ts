import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthCenterModule } from '@iss/ng-auth-center';

import { ORBITA_UI_ENV_TOKEN } from '@orbita/shared/environment';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AuthCenterModule.forRoot(environment.auth),
    AppRoutingModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot(),
    environment.production ? [] : StoreDevtoolsModule.instrument({ maxAge: 25 })
  ],
  providers: [
    { provide: ORBITA_UI_ENV_TOKEN, useValue: environment }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ActionCableService } from 'angular2-actioncable';
import { MarkdownModule } from 'ngx-markdown';
import { AuthCenterModule } from '@iss/ng-auth-center';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { MarkedOptions } from 'ngx-markdown';

import { environment } from '../environments/environment';

import { markedOptionsFactory } from './core/factories/markdown.factory';
// import { FakeBackendInterceptor } from './core/interceptors/fake-backend.interceptor';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    AuthCenterModule.forRoot(environment.auth),
    AppRoutingModule,
    MarkdownModule.forRoot({
      loader: HttpClient,
      markedOptions: {
        provide: MarkedOptions,
        useFactory: markedOptionsFactory,
      },
    }),
  ],
  providers: [
    ActionCableService,
    // { provide: HTTP_INTERCEPTORS, useClass: FakeBackendInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

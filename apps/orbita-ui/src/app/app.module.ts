import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

import { TicketSystemFeatureListingModule } from '@orbita/ticket-system/feature-listing';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([], { initialNavigation: 'enabled' }),
    StoreModule.forRoot({}),
    EffectsModule.forRoot(),
    environment.production ? [] : StoreDevtoolsModule.instrument({ maxAge: 25 }),
    TicketSystemFeatureListingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

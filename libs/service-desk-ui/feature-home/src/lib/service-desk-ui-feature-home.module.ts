import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ServiceDeskUiUiModule } from '@orbita/service-desk-ui/ui';
import { ServiceDeskUiDomainLogicModule } from '@orbita/service-desk-ui/domain-logic';
import { ServiceDeskUiFeatureSearchModule } from '@orbita/service-desk-ui/feature-search';

import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ServiceDeskUiUiModule,
    ServiceDeskUiDomainLogicModule,
    ServiceDeskUiFeatureSearchModule,
  ],
  declarations: [HomeComponent],
})
export class ServiceDeskUiFeatureHomeModule {}

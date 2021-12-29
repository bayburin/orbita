import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ServiceDeskUiUiModule } from '@orbita/service-desk-ui/ui';
import { ServiceDeskUiDomainLogicModule } from '@orbita/service-desk-ui/domain-logic';

import { NewKaseComponent } from './new-kase/new-kase.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: NewKaseComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), ServiceDeskUiUiModule, ServiceDeskUiDomainLogicModule],
  declarations: [NewKaseComponent],
})
export class ServiceDeskUiFeatureNewKaseModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ServiceDeskUiUiModule } from '@orbita/service-desk-ui/ui';
import { ServiceDeskUiDomainLogicModule } from '@orbita/service-desk-ui/domain-logic';

import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: SearchComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), ServiceDeskUiUiModule, ServiceDeskUiDomainLogicModule],
  declarations: [SearchComponent],
  exports: [SearchComponent],
})
export class ServiceDeskUiFeatureSearchModule {}
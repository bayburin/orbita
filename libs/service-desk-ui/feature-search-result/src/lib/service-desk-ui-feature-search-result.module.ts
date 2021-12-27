import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ServiceDeskUiUiModule } from '@orbita/service-desk-ui/ui';
import { ServiceDeskUiDomainLogicModule } from '@orbita/service-desk-ui/domain-logic';

import { SearchResultComponent } from './search-result/search-result.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: SearchResultComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), ServiceDeskUiUiModule, ServiceDeskUiDomainLogicModule],
  declarations: [SearchResultComponent],
  exports: [SearchResultComponent],
})
export class ServiceDeskUiFeatureSearchResultModule {}

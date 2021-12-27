import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ServiceDeskUiUiModule } from '@orbita/service-desk-ui/ui';
import { ServiceDeskUiDomainLogicModule } from '@orbita/service-desk-ui/domain-logic';
import { ServiceDeskUiFeatureSearchModule } from '@orbita/service-desk-ui/feature-search';

import { SearchResultComponent } from './search-result/search-result.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: SearchResultComponent,
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
  declarations: [SearchResultComponent],
})
export class ServiceDeskUiFeatureSearchResultModule {}

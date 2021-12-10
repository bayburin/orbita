import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ServiceDeskUiUiModule } from '@orbita/service-desk-ui/ui';
import { ServiceDeskUiDomainLogicModule } from '@orbita/service-desk-ui/domain-logic';

import { HomePageComponent } from './pages/home-page/home-page.component';
import { HomeBlockComponent } from './containers/home-block/home-block.component';
import { GlobalSearchComponent } from './containers/global-search/global-search.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomePageComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), ServiceDeskUiUiModule, ServiceDeskUiDomainLogicModule],
  declarations: [HomePageComponent, HomeBlockComponent, GlobalSearchComponent],
  exports: [HomePageComponent],
})
export class ServiceDeskUiFeatureHomeModule {}

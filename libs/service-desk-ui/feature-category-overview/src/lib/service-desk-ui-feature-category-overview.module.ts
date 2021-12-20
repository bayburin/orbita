import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ServiceDeskUiUiModule } from '@orbita/service-desk-ui/ui';
import { ServiceDeskUiDomainLogicModule } from '@orbita/service-desk-ui/domain-logic';

import { OverviewPageComponent } from './pages/overview-page/overview-page.component';
import { CategoryBlockComponent } from './containers/category-block/category-block.component';
import { CaseBlockComponent } from './containers/case-block/case-block.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: OverviewPageComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), ServiceDeskUiUiModule, ServiceDeskUiDomainLogicModule],
  declarations: [OverviewPageComponent, CategoryBlockComponent, CaseBlockComponent],
  exports: [OverviewPageComponent],
})
export class ServiceDeskUiFeatureCategoryOverviewModule {}
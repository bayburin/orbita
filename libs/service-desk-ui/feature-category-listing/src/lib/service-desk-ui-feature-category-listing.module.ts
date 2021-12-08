import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ServiceDeskUiUiModule } from '@orbita/service-desk-ui/ui';
import { ServiceDeskUiDomainLogicModule } from '@orbita/service-desk-ui/domain-logic';

import { CategoriesPageComponent } from './pages/categories-page/categories-page.component';
import { CategoriesBlockComponent } from './containers/categories-block/categories-block.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: CategoriesPageComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), ServiceDeskUiUiModule, ServiceDeskUiDomainLogicModule],
  declarations: [CategoriesPageComponent, CategoriesBlockComponent],
  exports: [CategoriesPageComponent],
})
export class ServiceDeskUiFeatureCategoryListingModule {}

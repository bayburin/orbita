import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { OrbitaUiDomainLogicModule } from '@orbita/orbita-ui/domain-logic';
import { OrbitaUiUiModule } from '@orbita/orbita-ui/ui';

import { OverviewPageComponent } from './pages/overview-page/overview-page.component';
import { EmployeeBlockComponent } from './containers/employee-block/employee-block.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: OverviewPageComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), OrbitaUiUiModule, OrbitaUiDomainLogicModule],
  declarations: [OverviewPageComponent, EmployeeBlockComponent],
  exports: [OverviewPageComponent],
})
export class OrbitaUiFeatureEmployeeOverviewModule {}

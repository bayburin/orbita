import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { OrbitaUiUiModule } from '@orbita/orbita-ui/ui';
import { OrbitaUiDomainLogicModule } from '@orbita/orbita-ui/domain-logic';

import { EmployeesPageComponent } from './pages/employees-page/employees-page.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: EmployeesPageComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), OrbitaUiUiModule, OrbitaUiDomainLogicModule],
  declarations: [EmployeesPageComponent],
  exports: [EmployeesPageComponent],
})
export class OrbitaUiFeatureEmployeeListingModule {}

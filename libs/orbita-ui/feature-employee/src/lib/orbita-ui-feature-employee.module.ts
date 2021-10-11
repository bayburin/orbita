import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeLayoutPageComponent } from './pages/employee-layout-page/employee-layout-page.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeeLayoutPageComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadChildren: () =>
          import('@orbita/orbita-ui/feature-employee-listing').then((m) => m.OrbitaUiFeatureEmployeeListingModule),
      },
      {
        path: ':id_tn',
        loadChildren: () =>
          import('@orbita/orbita-ui/feature-employee-overview').then((m) => m.OrbitaUiFeatureEmployeeOverviewModule),
        data: { breadcrumb: 'Просмотр работника' },
      },
    ],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [EmployeeLayoutPageComponent],
  exports: [EmployeeLayoutPageComponent],
})
export class OrbitaUiFeatureEmployeeModule {}

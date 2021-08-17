import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { OverviewPageComponent } from './pages/overview-page/overview-page.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: OverviewPageComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [OverviewPageComponent],
  exports: [OverviewPageComponent],
})
export class OrbitaUiFeatureEmployeeOverviewModule {}

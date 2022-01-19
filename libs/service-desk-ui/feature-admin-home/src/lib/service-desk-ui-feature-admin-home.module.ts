import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ServiceDeskUiUiModule } from '@orbita/service-desk-ui/ui';
import { ServiceDeskUiDomainLogicModule } from '@orbita/service-desk-ui/domain-logic';

import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminUserRecommendationsComponent } from './admin-user-recommendations/admin-user-recommendations.component';
import { AdminUserRecommendationFormComponent } from './admin-user-recommendation-form/admin-user-recommendation-form.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: AdminHomeComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), ServiceDeskUiUiModule, ServiceDeskUiDomainLogicModule],
  entryComponents: [AdminUserRecommendationFormComponent],
  declarations: [AdminHomeComponent, AdminUserRecommendationsComponent, AdminUserRecommendationFormComponent],
})
export class ServiceDeskUiFeatureAdminHomeModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { OrbitaUiUiModule } from '@orbita/orbita-ui/ui';
import { OrbitaUiDomainLogicModule } from '@orbita/orbita-ui/domain-logic';

import { OverviewPageComponent } from './pages/overview-page/overview-page.component';
import { OverviewBlockComponent } from './containers/overview-block/overview-block.component';
import { AttachmentsComponent } from './containers/attachments/attachments.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: OverviewPageComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), OrbitaUiUiModule, OrbitaUiDomainLogicModule],
  declarations: [OverviewPageComponent, OverviewBlockComponent, AttachmentsComponent],
  exports: [OverviewPageComponent],
})
export class OrbitaUiFeatureSdRequestOverviewModule {}

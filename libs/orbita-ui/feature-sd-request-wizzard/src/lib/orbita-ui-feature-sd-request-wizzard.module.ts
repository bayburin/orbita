import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { OrbitaUiUiModule } from '@orbita/orbita-ui/ui';
import { OrbitaUiDomainLogicModule } from '@orbita/orbita-ui/domain-logic';

import { NewSdRequestPageComponent } from './pages/new-sd-request-page/new-sd-request-page.component';
import { NewSdRequestBlockComponent } from './containers/new-sd-request-block/new-sd-request-block.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: NewSdRequestPageComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), OrbitaUiUiModule, OrbitaUiDomainLogicModule],
  declarations: [NewSdRequestPageComponent, NewSdRequestBlockComponent],
  exports: [NewSdRequestPageComponent],
})
export class OrbitaUiFeatureSdRequestWizzardModule {}

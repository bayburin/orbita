import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ServiceDeskUiUiModule } from '@orbita/service-desk-ui/ui';

import { KaseBlockComponent } from './containers/kase-block/kase-block.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: KaseBlockComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), ServiceDeskUiUiModule],
  declarations: [KaseBlockComponent],
})
export class ServiceDeskUiFeatureKaseListingModule {}

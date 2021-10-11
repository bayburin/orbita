import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { OrbitaUiUiModule } from '@orbita/orbita-ui/ui';
import { OrbitaUiDomainLogicModule } from '@orbita/orbita-ui/domain-logic';

import { SdRequestsBlockComponent } from './containers/sd-requests-block/sd-requests-block.component';
import { TicketsPageComponent } from './pages/tickets-page/tickets-page.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: TicketsPageComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), OrbitaUiUiModule, OrbitaUiDomainLogicModule],
  declarations: [TicketsPageComponent, SdRequestsBlockComponent],
  exports: [TicketsPageComponent],
})
export class OrbitaUiFeatureListingModule {}

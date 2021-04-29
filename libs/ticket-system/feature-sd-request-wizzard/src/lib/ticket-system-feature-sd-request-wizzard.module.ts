import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { NewSdRequestPageComponent } from './pages/new-sd-request-page/new-sd-request-page.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: NewSdRequestPageComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    NewSdRequestPageComponent
  ],
  exports: [
    NewSdRequestPageComponent
  ],
})
export class TicketSystemFeatureSdRequestWizzardModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ServiceDeskUiUiModule } from '@orbita/service-desk-ui/ui';
import { ServiceDeskUiDomainLogicModule } from '@orbita/service-desk-ui/domain-logic';

import { MarkdownHelpComponent } from './markdown-help/markdown-help.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: MarkdownHelpComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), ServiceDeskUiUiModule, ServiceDeskUiDomainLogicModule],
  declarations: [MarkdownHelpComponent],
  exports: [MarkdownHelpComponent],
})
export class ServiceDeskUiFeatureMarkdownHelpModule {}

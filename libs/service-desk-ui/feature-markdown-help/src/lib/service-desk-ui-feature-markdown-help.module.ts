import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { MarkdownHelpComponent } from './markdown-help/markdown-help.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: MarkdownHelpComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [MarkdownHelpComponent],
})
export class ServiceDeskUiFeatureMarkdownHelpModule {}

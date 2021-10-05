import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { OrbitaUiUiModule } from '@orbita/orbita-ui/ui';
import { OrbitaUiDomainLogicModule } from '@orbita/orbita-ui/domain-logic';

import { SvtItemsPageComponent } from './pages/svt-items-page/svt-items-page.component';
import { SvtItemsBlockComponent } from './containers/svt-items-block/svt-items-block.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: SvtItemsPageComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), OrbitaUiUiModule, OrbitaUiDomainLogicModule],
  declarations: [SvtItemsPageComponent, SvtItemsBlockComponent],
  exports: [SvtItemsPageComponent],
})
export class OrbitaUiFeatureSvtItemListingModule {}

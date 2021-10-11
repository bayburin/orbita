import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SvtItemLayoutPageComponent } from './pages/svt-item-layout-page/svt-item-layout-page.component';

const routes: Routes = [
  {
    path: '',
    component: SvtItemLayoutPageComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadChildren: () =>
          import('@orbita/orbita-ui/feature-svt-item-listing').then((m) => m.OrbitaUiFeatureSvtItemListingModule),
      },
    ],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [SvtItemLayoutPageComponent],
  exports: [SvtItemLayoutPageComponent],
})
export class OrbitaUiFeatureSvtItemModule {}

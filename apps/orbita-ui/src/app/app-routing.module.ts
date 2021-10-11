import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthCenterGuard } from '@iss/ng-auth-center';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('@orbita/orbita-ui/shell').then((m) => m.OrbitaUiShellModule),
    canActivate: [AuthCenterGuard],
  },
  {
    path: '**',
    redirectTo: 'orbita-ui',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

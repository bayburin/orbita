import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthCenterGuard } from '@iss/ng-auth-center';

const routes: Routes = [
  {
    path: 'new',
    loadChildren: () => import('@orbita/service-desk-ui/shell').then((m) => m.ServiceDeskUiShellModule),
    canActivate: [AuthCenterGuard],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

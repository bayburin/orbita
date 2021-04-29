import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthCenterGuard } from '@iss/ng-auth-center';

export const routes: Routes = [
  {
    path: 'ticket-system',
    loadChildren: () => import('@orbita/ticket-system/shell').then(
      m => m.TicketSystemShellModule
    ),
    canActivate: [AuthCenterGuard]
  },
  {
    path: '**',
    redirectTo: 'ticket-system'
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}

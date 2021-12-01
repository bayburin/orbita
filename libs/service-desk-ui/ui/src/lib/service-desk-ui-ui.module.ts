import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRecommendationsComponent } from './components/user-recommendations/user-recommendations.component';
import { LoadingComponent } from './components/loading/loading.component';

const components: any[] = [UserRecommendationsComponent, LoadingComponent];

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [components],
  exports: [components],
})
export class ServiceDeskUiUiModule {}

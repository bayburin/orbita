import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRecommendationsComponent } from './components/user-recommendations/user-recommendations.component';
import { LoadingComponent } from './components/loading/loading.component';
import { SectionHeaderComponent } from './components/section-header/section-header.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { CategoryHeaderComponent } from './components/category-header/category-header.component';

const components: any[] = [
  UserRecommendationsComponent,
  LoadingComponent,
  SectionHeaderComponent,
  CategoryListComponent,
  CategoryHeaderComponent,
];

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [components],
  exports: [components],
})
export class ServiceDeskUiUiModule {}

import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgBootstrapModule } from './ng-bootstrap.module';

import { UserRecommendationsComponent } from './components/user-recommendations/user-recommendations.component';
import { LoadingComponent } from './components/loading/loading.component';
import { SectionHeaderComponent } from './components/section-header/section-header.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { CategoryHeaderComponent } from './components/category-header/category-header.component';
import { DashboardQuestionFaqComponent } from './components/dashboard-question-faq/dashboard-question-faq.component';

const modules: any[] = [FormsModule, ReactiveFormsModule, NgBootstrapModule];

const components: any[] = [
  UserRecommendationsComponent,
  LoadingComponent,
  SectionHeaderComponent,
  CategoryListComponent,
  CategoryHeaderComponent,
  DashboardQuestionFaqComponent,
];

@NgModule({
  imports: [CommonModule, RouterModule, modules],
  declarations: [components],
  exports: [components, modules],
})
export class ServiceDeskUiUiModule {}

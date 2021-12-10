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
import { HomeQuestionFaqComponent } from './components/home-question-faq/home-question-faq.component';
import { CategoryComponent } from './components/category/category.component';
import { ServiceComponent } from './components/service/service.component';
import { QuestionComponent } from './components/question/question.component';
import { SearchResultTemplateComponent } from './components/search-result-template/search-result-template.component';
import { FooterComponent } from './components/footer/footer.component';
import { LogoComponent } from './components/logo/logo.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { NotificationListComponent } from './components/notification-list/notification-list.component';
import { NotificationAlertListComponent } from './components/notification-alert-list/notification-alert-list.component';

const modules: any[] = [FormsModule, ReactiveFormsModule, NgBootstrapModule];

const components: any[] = [
  UserRecommendationsComponent,
  LoadingComponent,
  SectionHeaderComponent,
  CategoryListComponent,
  CategoryHeaderComponent,
  HomeQuestionFaqComponent,
  CategoryComponent,
  ServiceComponent,
  QuestionComponent,
  FooterComponent,
  LogoComponent,
  UserProfileComponent,
  NotificationListComponent,
  NotificationAlertListComponent,
];

@NgModule({
  imports: [CommonModule, RouterModule, modules],
  declarations: [components, SearchResultTemplateComponent],
  entryComponents: [CategoryComponent, ServiceComponent, QuestionComponent],
  exports: [components, modules, SearchResultTemplateComponent],
})
export class ServiceDeskUiUiModule {}

import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';

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
import { ServiceListComponent } from './components/service-list/service-list.component';
import { ServiceLinkComponent } from './components/service-link/service-link.component';
import { QuestionListComponent } from './components/question-list/question-list.component';
import { AbstractSearchResultComponent } from './components/abstract-search-result/abstract-search-result.component';
import { VisibleIconComponent } from './components/visible-icon/visible-icon.component';

import { QuestionCheckAccessDirective } from './directives/question-check-access/question-check-access.directive';
import { ServiceCheckAccessDirective } from './directives/service-check-access/service-check-access.directive';

const modules: any[] = [FormsModule, ReactiveFormsModule, NgBootstrapModule];

const directives: any[] = [QuestionCheckAccessDirective, ServiceCheckAccessDirective];

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
  SearchResultTemplateComponent,
  ServiceListComponent,
  ServiceLinkComponent,
  QuestionListComponent,
  AbstractSearchResultComponent,
  VisibleIconComponent,
];

@NgModule({
  imports: [CommonModule, RouterModule, MarkdownModule.forChild(), ...modules],
  declarations: [...components, ...directives],
  entryComponents: [CategoryComponent, ServiceComponent, QuestionComponent],
  exports: [...components, ...modules, ...directives],
})
export class ServiceDeskUiUiModule {}

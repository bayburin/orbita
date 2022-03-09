import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';
import { TrinityRingsSpinnerModule } from 'angular-epic-spinners';
import { SharedUiModule } from '@orbita/shared/ui';

import { NgBootstrapModule } from './ng-bootstrap.module';
import { PrimengModule } from './primeng.module';

import { QuestionCheckAccessDirective } from './directives/question-check-access/question-check-access.directive';
import { ServiceCheckAccessDirective } from './directives/service-check-access/service-check-access.directive';
import { UserCheckAccessDirective } from './directives/user-check-access/user-check-access.directive';
import { SearchResultQuestionComponent } from './components/search-result-question/search-result-question.component';
import { ShowQuestionLinkDirective } from './directives/show-question-link/show-question-link.directive';
import { GetQuestionLinkDirective } from './directives/get-question-link/get-question-link.directive';
import { FileIconDirective } from './directives/file-icon/file-icon.directive';
import { DisableOnLoadingDirective } from './directives/disable-on-loading/disable-on-loading.directive';
import { ExternalHrefDirective } from './directives/external-href/external-href.directive';

import { QueryParamsPipe } from './pipes/query-params/query-params.pipe';

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
import { KaseListComponent } from './components/kase-list/kase-list.component';
import { KaseCardComponent } from './components/kase-card/kase-card.component';
import { FilterTemplateComponent } from './components/filter-template/filter-template.component';
import { BreadcrumbListComponent } from './components/breadcrumb-list/breadcrumb-list.component';
import { AnswerListComponent } from './components/answer-list/answer-list.component';
import { AttachmentListComponent } from './components/attachment-list/attachment-list.component';
import { LoadingIndicatorDirective } from './directives/loading-indicator/loading-indicator.directive';
import { ResponsibleUserListComponent } from './components/responsible-user-list/responsible-user-list.component';
import { SearchResultListComponent } from './components/search-result-list/search-result-list.component';
import { AdminUserRecommendationsTableComponent } from './components/admin-user-recommendations-table/admin-user-recommendations-table.component';
import { AdminCategoriesTableComponent } from './components/admin-categories-table/admin-categories-table.component';
import { AdminServicesTableComponent } from './components/admin-services-table/admin-services-table.component';
import { ServiceIsHiddenTypeComponent } from './components/service-is-hidden-type/service-is-hidden-type.component';
import { ServiceHasCommonCaseTypeComponent } from './components/service-has-common-case-type/service-has-common-case-type.component';
import { AdminQuestionListComponent } from './components/admin-question-list/admin-question-list.component';
import { AdminQuestionComponent } from './components/admin-question/admin-question.component';
import { AdminAnswerListComponent } from './components/admin-answer-list/admin-answer-list.component';

const modules: any[] = [
  FormsModule,
  ReactiveFormsModule,
  SharedUiModule,
  NgBootstrapModule,
  TrinityRingsSpinnerModule,
  PrimengModule,
];

const directives: any[] = [
  QuestionCheckAccessDirective,
  ServiceCheckAccessDirective,
  UserCheckAccessDirective,
  ShowQuestionLinkDirective,
  GetQuestionLinkDirective,
  FileIconDirective,
  LoadingIndicatorDirective,
  DisableOnLoadingDirective,
  ExternalHrefDirective,
];

const pipes: any[] = [QueryParamsPipe];

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
  SearchResultQuestionComponent,
  KaseListComponent,
  KaseCardComponent,
  FilterTemplateComponent,
  BreadcrumbListComponent,
  AnswerListComponent,
  AttachmentListComponent,
  ResponsibleUserListComponent,
  SearchResultListComponent,
  ServiceIsHiddenTypeComponent,
  ServiceHasCommonCaseTypeComponent,
  AdminUserRecommendationsTableComponent,
  AdminCategoriesTableComponent,
  AdminServicesTableComponent,
  AdminQuestionListComponent,
  AdminQuestionComponent,
  AdminAnswerListComponent,
];

@NgModule({
  imports: [CommonModule, RouterModule, MarkdownModule.forChild(), ...modules],
  declarations: [...components, ...directives, ...pipes],
  entryComponents: [CategoryComponent, ServiceComponent, QuestionComponent],
  exports: [...components, ...modules, ...directives, ...pipes],
})
export class ServiceDeskUiUiModule {}

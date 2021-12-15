import { ServiceVM } from './view-models/service-vm.interface';
import { QuestionVM } from './view-models/question-vm.interface';
import { QuestionOverviewVM } from './view-models/question-overview-vm.interface';

export enum QuestionPermission {
  VIEW_MANAGE_INFO = 'viewManageInfo', // Доступ к административным флагам и скрытым вопросам
  PUBLISH = 'publish', // Доступ к публикации вопроса
  DESTROY = 'destroy', // Доступ к удалению вопроса
}

export enum ServicePermission {
  VIEW_MANAGE_INFO = 'viewManageInfo', // Доступ к административным флагам
  MANAGE = 'manage', // Доступ ответственного за услугу (создание новых вопросов в услуге, редактирование вопросов в услуге)
}

export enum ResponsibleUserPermission {
  VIEW = 'view', // Допступ на просмотр ответственных
}

export type policyObjectTypes = QuestionOverviewVM | QuestionVM | ServiceVM;

export type policyPermissionTypes = QuestionPermission | ServicePermission | ResponsibleUserPermission;

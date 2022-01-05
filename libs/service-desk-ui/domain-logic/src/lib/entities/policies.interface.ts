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

export enum UserPermission {
  VIEW_ADMIN_PAGE = 'viewAdminPage', // Доступ к странице администрирования
  VIEW_RESPONSIBLE_USERS = 'viewResponsibleUsers', // Допступ на просмотр ответственных
}

export type policyObjectTypes = QuestionOverviewVM | QuestionVM | ServiceVM;

export type policyPermissionTypes = QuestionPermission | ServicePermission | UserPermission;

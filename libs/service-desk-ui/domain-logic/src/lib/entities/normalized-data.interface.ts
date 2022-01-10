import { Dictionary } from '@ngrx/entity';
import { Category } from './models/category.interface';
import { Service } from './models/service.interface';
import { Question } from './models/question.interface';
import { ResponsibleUser } from './models/responsible-user.interface';
import { Answer } from './models/answer.interface';
import { Attachment } from './models/attachment.interface';
import { Ticket } from './models/ticket.interface';
import { EmployeeShort } from './models/employee/employee-short.interface';

/**
 * Нормализованные данные категории
 */
export interface NormalizedCategoriesEntities {
  categories?: Dictionary<Category>;
  services?: Dictionary<Service>;
  questions?: Dictionary<Question>;
  answers?: Dictionary<Answer>;
  responsible_users?: Dictionary<ResponsibleUser>;
  attachments?: Dictionary<Attachment>;
}

/**
 * Нормализованные данные списка категорий, возвращаемый функцией normalize
 */
export interface NormalizedCategories {
  entities: NormalizedCategoriesEntities;
  result: number[] | number;
}

/**
 * Нормализованные данные услуг
 */
export interface NormalizedServicesEntities {
  categories?: Dictionary<Category>;
  services?: Dictionary<Service>;
  questions?: Dictionary<Question>;
  answers?: Dictionary<Answer>;
  responsible_users?: Dictionary<ResponsibleUser>;
  attachments?: Dictionary<Attachment>;
  employees?: Dictionary<EmployeeShort>;
}

/**
 * Нормализованные данные списка услуг, возвращаемый функцией normalize
 */
export interface NormalizedServices {
  entities: NormalizedServicesEntities;
  result: number[] | number;
}

/**
 * Нормализованные данные вопросов
 */
export interface NormalizedQuestionsEntities {
  services?: Dictionary<Service>;
  questions?: Dictionary<Question>;
  responsible_users?: Dictionary<ResponsibleUser>;
  answers?: Dictionary<Answer>;
  attachments?: Dictionary<Attachment>;
  employees?: Dictionary<EmployeeShort>;
}

/**
 * Нормализованные данные списка вопросов, возвращаемый функцией normalize
 */
export interface NormalizedQuestions {
  entities: NormalizedQuestionsEntities;
  result: number[] | number;
}

/**
 * Нормализованные данные тикетов
 */
export interface NormalizedTicketsEntities {
  tickets?: Dictionary<Ticket>;
  services?: Dictionary<Service>;
  responsible_users?: Dictionary<ResponsibleUser>;
}

/**
 * Нормализованные данные списка тикетов, возвращаемый функцией normalize
 */
export interface NormalizedTickets {
  entities: NormalizedTicketsEntities;
  result: number[] | number;
}

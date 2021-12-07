import { Dictionary } from '@ngrx/entity';
import { Category } from './model/category.interface';
import { Service } from './model/service.interface';
import { Question } from './model/question.interface';
import { ResponsibleUser } from './model/responsible-user.interface';
import { Answer } from './model/answer.interface';

/**
 * Нормализованные данные категории
 */
export interface NormalizedCategoriesEntities {
  categories: Dictionary<Category>;
  services: Dictionary<Service>;
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
  services: Dictionary<Service>;
  questions: Dictionary<Question>;
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
  services: Dictionary<Service>;
  questions: Dictionary<Question>;
  responsible_users: Dictionary<ResponsibleUser>;
  answers: Dictionary<Answer>;
}

/**
 * Нормализованные данные списка услуг, возвращаемый функцией normalize
 */
export interface NormalizedQuestions {
  entities: NormalizedQuestionsEntities;
  result: number[] | number;
}

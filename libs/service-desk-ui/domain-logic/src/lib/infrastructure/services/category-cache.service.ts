import { schema, normalize } from 'normalizr';

import { Category } from './../../entities/model/category.interface';
import { NormalizedCategories } from './../../entities/normalized-data.interface';

export const responsibleUserSchema = new schema.Entity('responsible_users');

export const answerAttachmentSchema = new schema.Entity('answer_attachments');

export const answerSchema = new schema.Entity('answers');

export const serviceSchema = new schema.Entity('services');

export const questionSchema = new schema.Entity('questions', {
  // answers: [answerSchema],
  responsible_users: [responsibleUserSchema],
});

export const categorySchema = new schema.Entity('categories', {
  services: [serviceSchema],
  faq: [questionSchema],
});

export const categoriesSchema = new schema.Array(categorySchema);

/**
 * Сервис для нормализации данных по категориям
 */
export class CategoryCacheService {
  static normalizeategories(categories: Category | Category[]): NormalizedCategories {
    return Array.isArray(categories) ? normalize(categories, categoriesSchema) : normalize(categories, categorySchema);
  }
}

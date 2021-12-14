import { schema, normalize, denormalize } from 'normalizr';

import { Category } from './../../entities/model/category.interface';
import { CategoryVM } from './../../entities/view-models/category-vm.interface';
import { NormalizedCategories, NormalizedCategoriesEntities } from './../../entities/normalized-data.interface';

export const responsibleUserSchema = new schema.Entity('responsible_users');

export const answerAttachmentSchema = new schema.Entity('answer_attachments');

export const answerSchema = new schema.Entity('answers');

export const serviceSchema = new schema.Entity('services');

export const questionSchema = new schema.Entity('questions', {
  answers: [answerSchema],
  responsible_users: [responsibleUserSchema],
});

export const categorySchema = new schema.Entity('categories', {
  services: [serviceSchema],
  faq: [questionSchema],
});

export const categoriesSchema = new schema.Array(categorySchema);

/**
 * Сервис для нормализации/денормализации данных по категориям
 */
export class CategoryCacheService {
  static normalizeCategories(categories: Category | Category[]): NormalizedCategories {
    return Array.isArray(categories) ? normalize(categories, categoriesSchema) : normalize(categories, categorySchema);
  }

  static denormalizeCategory(category: Category, entities: NormalizedCategoriesEntities): CategoryVM {
    return denormalize(category, categorySchema, entities);
  }
}

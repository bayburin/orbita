import { normalize } from 'normalizr';

import { Category } from './../../entities/model/category.interface';
import { categoriesSchema, categorySchema } from './../schemas/normalizr.schema';
import { NormalizedCategories } from './../../entities/normalized-data.interface';

/**
 * Сервис для нормализации данных по категориям
 */
export class CategoryCacheService {
  static normalizeategories(categories: Category | Category[]): NormalizedCategories {
    return Array.isArray(categories) ? normalize(categories, categoriesSchema) : normalize(categories, categorySchema);
  }
}

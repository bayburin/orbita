import { Category } from '../models/category/category.model';

export class CategoryFactory {
  static create(params: any) {
    return new Category(params);
  }
}

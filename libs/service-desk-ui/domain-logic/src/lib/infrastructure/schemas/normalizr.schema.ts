import { schema } from 'normalizr';

export const questionSchema = new schema.Entity('questions');

export const serviceSchema = new schema.Entity('services', {
  questions: [questionSchema],
});

export const servicesSchema = new schema.Array(serviceSchema);

export const categorySchema = new schema.Entity('categories', {
  services: [serviceSchema],
});

export const categoriesSchema = new schema.Array(categorySchema);

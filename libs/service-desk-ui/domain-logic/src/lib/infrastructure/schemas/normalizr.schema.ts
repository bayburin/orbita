import { schema } from 'normalizr';

export const ticketSchema = new schema.Entity('tickets');

export const serviceSchema = new schema.Entity('services', {
  tickets: [ticketSchema],
});

export const categorySchema = new schema.Entity('categories', {
  services: [serviceSchema],
});

export const categoriesSchema = new schema.Array(categorySchema);

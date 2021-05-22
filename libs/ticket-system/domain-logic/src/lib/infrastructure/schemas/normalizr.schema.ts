import { normalize, schema } from 'normalizr';

export const parameter_schema = new schema.Entity('parameters');

export const work_schema = new schema.Entity('works');

export const comment_schema = new schema.Entity('comments');

export const sd_request_schema = new schema.Entity('sd_requests', {
  parameters: [parameter_schema],
  works: [work_schema],
  comments: [comment_schema]
});

export const sd_requests_schema = { sd_requests: [sd_request_schema] }

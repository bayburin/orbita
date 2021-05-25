import { schema } from 'normalizr';

export const parameter_schema = new schema.Entity('parameters');

export const comment_schema = new schema.Entity('comments');

export const history_schema = new schema.Entity('histories');

export const work_schema = new schema.Entity('works', {
  histories: [history_schema]
});

export const sd_request_schema = new schema.Entity('sd_requests', {
  parameters: [parameter_schema],
  works: [work_schema],
  comments: [comment_schema],
});

export const sd_requests_schema = { sd_requests: [sd_request_schema] }

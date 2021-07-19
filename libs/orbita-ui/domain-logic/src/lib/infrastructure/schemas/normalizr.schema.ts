import { schema } from 'normalizr';

export const parameterSchema = new schema.Entity('parameters');

export const commentSchema = new schema.Entity('comments');

export const historySchema = new schema.Entity('histories');

export const workerSchema = new schema.Entity('workers');

export const workflowSchema = new schema.Entity('workflows');

export const attachmentSchema = new schema.Entity('attachments');

export const workSchema = new schema.Entity('works', {
  histories: [historySchema],
  workers: [workerSchema],
  workflows: [workflowSchema],
});

export const sdRequestSchema = new schema.Entity('sd_requests', {
  parameters: [parameterSchema],
  works: [workSchema],
  comments: [commentSchema],
  attachments: [attachmentSchema],
});

// export const sdRequestsSchema = { sd_requests: [sdRequestSchema] };
export const sdRequestsSchema = new schema.Array(sdRequestSchema);

export const sdServiceSchema = new schema.Entity('services');

export const sdTicketSchema = new schema.Entity('tickets', {
  service: sdServiceSchema,
});

export const sdTicketsSchema = new schema.Array(sdTicketSchema);

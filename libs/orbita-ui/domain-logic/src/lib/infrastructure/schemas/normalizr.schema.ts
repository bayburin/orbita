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

export const svtTypeSchema = new schema.Entity('types', {}, { idAttribute: 'type_id' });

export const svtWorkplaceCountSchema = new schema.Entity('workplace_counts', {}, { idAttribute: 'workplace_count_id' });

export const svtWorkplaceTypeSchema = new schema.Entity('workplace_types', {}, { idAttribute: 'workplace_type_id' });

export const svtWorkplaceSchema = new schema.Entity(
  'workplaces',
  {
    workplace_type: svtWorkplaceTypeSchema,
    workplace_count: svtWorkplaceCountSchema,
  },
  { idAttribute: 'workplace_id' }
);

export const svtItemSchema = new schema.Entity(
  'items',
  {
    type: svtTypeSchema,
    workplace: svtWorkplaceSchema,
  },
  { idAttribute: (attr) => attr.barcode_item.id }
);

export const svtItemsSchema = new schema.Array(svtItemSchema);

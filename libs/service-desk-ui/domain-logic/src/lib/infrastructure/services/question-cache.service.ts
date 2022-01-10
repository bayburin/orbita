import { schema, normalize, denormalize } from 'normalizr';

import { NormalizedQuestions, NormalizedQuestionsEntities } from './../../entities/normalized-data.interface';
import { Question } from '../../entities/models/question.interface';
import { QuestionOverviewVM } from '../../entities/view-models/question-overview-vm.interface';

export const employees = new schema.Entity('employees');

export const responsibleUserSchema = new schema.Entity(
  'responsible_users',
  { details: employees },
  { processStrategy: (value) => ({ ...value, details: value.tn }) }
);

export const attachmentSchema = new schema.Entity('attachments');

export const answerSchema = new schema.Entity('answers', {
  attachments: [attachmentSchema],
});

export const serviceSchema = new schema.Entity('services', {
  responsible_users: [responsibleUserSchema],
});

export const questionSchema = new schema.Entity('questions', {
  ticket: {
    service: serviceSchema,
    responsible_users: [responsibleUserSchema],
  },
  answers: [answerSchema],
});

export const questionsSchema = new schema.Array(questionSchema);

/**
 * Сервис для нормализации данных по вопросам
 */
export class QuestionCacheService {
  static normalizeQuestions(questions: Question | Question[]): NormalizedQuestions {
    return Array.isArray(questions) ? normalize(questions, questionsSchema) : normalize(questions, questionSchema);
  }

  static denormalizeQuestions(questionIds: number[], entities: NormalizedQuestionsEntities): QuestionOverviewVM[] {
    return denormalize(questionIds, questionsSchema, entities);
  }
}

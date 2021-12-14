import { schema, normalize } from 'normalizr';

import { NormalizedQuestions } from './../../entities/normalized-data.interface';
import { Question } from './../../entities/model/question.interface';

export const responsibleUserSchema = new schema.Entity('responsible_users');

export const answerAttachmentSchema = new schema.Entity('answer_attachments');

// export const answerSchema = new schema.Entity('answers');

export const serviceSchema = new schema.Entity('services', {
  responsible_users: [responsibleUserSchema],
});

export const questionSchema = new schema.Entity('questions', {
  ticket: {
    service: serviceSchema,
    responsible_users: [responsibleUserSchema],
  },
  // answers: [answerSchema],
});

export const questionsSchema = new schema.Array(questionSchema);

/**
 * Сервис для нормализации данных по вопросам
 */
export class QuestionCacheService {
  static normalizeQuestions(questions: Question | Question[]): NormalizedQuestions {
    return Array.isArray(questions) ? normalize(questions, questionsSchema) : normalize(questions, questionSchema);
  }
}

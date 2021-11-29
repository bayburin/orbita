import { Answer } from '../models/answer/answer.model';

export class AnswerFactory {
  static create(params: any) {
    return new Answer(params);
  }
}

import { QuestionVM } from '../../entities/view-models/question-vm.interface';

export abstract class QuestionFacadeAbstract {
  /**
   * Увеличивает рейтинг популярности вопроса
   *
   * @param question - вопрос
   */
  abstract upRating(question: QuestionVM): void;
}

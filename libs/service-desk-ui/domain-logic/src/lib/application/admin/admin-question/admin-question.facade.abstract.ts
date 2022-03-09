export abstract class AdminQuestionFacadeAbstract {
  /**
   * Опубликовывает вопрос
   *
   * @param id - id вопроса
   */
  abstract publish(id: number): void;

  /**
   * Удаляет опубликованный вопрос
   *
   * @param id - id вопроса
   */
  abstract destroyPublished(id: number): void;

  /**
   * Удаляет черновой вопрос
   *
   * @param id - id вопроса
   */
  abstract destroyDraft(id: number): void;
}

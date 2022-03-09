/**
 * Объект, соединяющий приложение, к которому привязан тикет, с самим тикетом
 */
export interface ClaimApplication {
  /**
   * Идентификатор связи с приложением
   */
  readonly id: number;

  /**
   * Идентификатор заявки
   */
  readonly claim_id: number;

  /**
   * Идентификатор приложения
   */
  readonly application_id: number;

  /**
   * Номер заявки в указанном приложении
   */
  readonly integration_id: number;
}

/**
 * Вопрос
 */
export interface Answer {
  readonly id: number;
  readonly question_id: number;
  readonly reason: string;
  readonly answer: string;
  readonly attachments: number[];
  readonly link: string;
  readonly is_hidden: boolean;
}

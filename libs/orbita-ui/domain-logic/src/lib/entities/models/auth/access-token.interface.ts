/**
 * Интерфейс токена, полученного у ЦА
 */
export interface AccessToken {
  readonly access_token: string;
  readonly expires_in: number;
  readonly refresh_token: string;
  readonly token_type: string;
}

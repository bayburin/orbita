import { Role } from './role.interface';

/**
 * Пользователь
 */
export interface User {
  readonly tn: number;
  readonly dept: number;
  readonly fio: string;
  readonly room: string;
  readonly tel: string;
  readonly email: string;
  readonly comment: string;
  readonly duty: string;
  readonly status: string;
  readonly datereg: string;
  readonly duty_code: number;
  readonly fio_initials: string;
  readonly category: number;
  readonly id_tn: number;
  readonly login: string;
  readonly dept_kadr: number;
  readonly ms: number;
  readonly tn_ms: number;
  readonly adLogin: string;
  readonly mail: string;
  readonly surname: string;
  readonly firstname: string;
  readonly middlename: string;
  readonly initials_family: string;
  readonly family_with_initials: string;
  readonly is_chief: boolean;
  readonly role_id: number;
  readonly role: Role;
}

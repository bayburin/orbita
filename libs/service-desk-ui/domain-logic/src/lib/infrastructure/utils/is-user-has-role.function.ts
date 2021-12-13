import { User } from './../../entities/model/user.interface';

/**
 * Определяет, имеется ли у пользователя указанная роль (или одна из ролей)
 *
 * @param user - пользователь
 * @param roleName - имя роли или массив ролей
 */
export function isUserHasRole(user: User, roleName: string | string[]): boolean {
  if (typeof roleName === 'string') {
    return user.role.name === roleName;
  } else {
    return roleName.includes(user.role.name);
  }
}

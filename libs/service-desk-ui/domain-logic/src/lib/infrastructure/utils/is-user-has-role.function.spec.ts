import { isUserHasRole } from './is-user-has-role.function';
import { User } from './../../entities/model/user.interface';

describe('isUserHasRole', () => {
  let user: User;
  const createUser = (roleName = ''): User =>
    ({
      role: {
        name: roleName,
      },
    } as User);

  beforeEach(() => {
    user = createUser('user-role');
  });

  it('should return true if name of user role match with received string', () => {
    expect(isUserHasRole(user, 'user-role')).toBe(true);
  });

  it('should return false if name of user role does not match with received string', () => {
    expect(isUserHasRole(user, 'fake-role')).toBe(false);
  });

  it('should return true if name of user role user match with one of array string', () => {
    expect(isUserHasRole(user, ['user-role', 'fake-role'])).toBe(true);
  });

  it('should return false if name of user role user does not match with any of array string', () => {
    expect(isUserHasRole(user, ['fake-role', 'another-fake-role'])).toBe(false);
  });
});

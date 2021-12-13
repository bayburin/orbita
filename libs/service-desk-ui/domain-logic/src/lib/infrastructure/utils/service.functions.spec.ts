import { ServiceVM } from './../../entities/view-models/service-vm.interface';
import { isServiceBelongsToUser } from './service.functions';
import { User } from './../../entities/model/user.interface';
import { ResponsibleUser } from './../../entities/model/responsible-user.interface';

describe('isServiceBelongsToUser', () => {
  let user: User;
  let service: ServiceVM;
  const createUser = (tn: number): User =>
    ({
      tn,
    } as User);
  const createService = (name = '', tns: number[]): ServiceVM =>
    ({
      name,
      responsible_users: tns.map((tn) => ({ tn } as ResponsibleUser)),
    } as ServiceVM);

  beforeEach(() => {
    user = createUser(17664);
  });

  it('should return true if tn of user match with one of service tn', () => {
    service = createService('fake', [17664, 12345]);

    expect(isServiceBelongsToUser(service, user)).toBe(true);
  });

  it('should return false if tn of user does not match with any of service tn', () => {
    service = createService('fake', [56789, 12345]);

    expect(isServiceBelongsToUser(service, user)).toBe(false);
  });
});

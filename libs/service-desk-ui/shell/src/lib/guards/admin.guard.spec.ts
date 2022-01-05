import { TestBed } from '@angular/core/testing';
import { UserPolicyService, UserPolicyServiceStub } from '@orbita/service-desk-ui/domain-logic';

import { AdminGuard } from './admin.guard';

describe('AdminGuard', () => {
  let guard: AdminGuard;
  let userPolicy: UserPolicyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminGuard, { provide: UserPolicyService, useClass: UserPolicyServiceStub }],
    });

    guard = TestBed.inject(AdminGuard);
    userPolicy = TestBed.inject(UserPolicyService);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  describe('canActivate()', () => {
    it('should return true if userPolicy grants access', () => {
      jest.spyOn(userPolicy, 'checkAccess').mockReturnValue(true);

      expect(guard.canLoad()).toBe(true);
    });

    it('should return false if userPolicy denies access', () => {
      jest.spyOn(userPolicy, 'checkAccess').mockReturnValue(false);

      expect(guard.canLoad()).toBe(false);
    });
  });
});

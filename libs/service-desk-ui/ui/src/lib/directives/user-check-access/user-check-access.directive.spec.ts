import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { Component, TemplateRef, ViewContainerRef } from '@angular/core';
import { UserPermission, UserPolicyService, UserPolicyServiceStub } from '@orbita/service-desk-ui/domain-logic';

import { UserCheckAccessDirective } from './user-check-access.directive';

@Component({
  template: `<div *libUserCheckAccess="permission.VIEW_ADMIN_PAGE">Тестовый компонент</div>`,
})
class TestContainerComponent {
  permission = UserPermission;
}

describe('UserCheckAccessDirective', () => {
  let fixture: ComponentFixture<TestContainerComponent>;
  let component: TestContainerComponent;
  let directive: UserCheckAccessDirective;
  let policy: UserPolicyService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [TestContainerComponent, UserCheckAccessDirective],
        providers: [
          UserCheckAccessDirective,
          TemplateRef,
          ViewContainerRef,
          { provide: UserPolicyService, useClass: UserPolicyServiceStub },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TestContainerComponent);
    component = fixture.componentInstance;
    directive = TestBed.inject(UserCheckAccessDirective);
    policy = TestBed.inject(UserPolicyService);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  describe('when policy grant access', () => {
    it('should create element', () => {
      jest.spyOn(policy, 'checkAccess').mockReturnValue(true);
      fixture.detectChanges();

      expect(fixture.debugElement.nativeElement.textContent).toEqual('Тестовый компонент');
    });
  });

  describe('when policy deny access', () => {
    it('should not create element', () => {
      jest.spyOn(policy, 'checkAccess').mockReturnValue(false);
      fixture.detectChanges();

      expect(fixture.debugElement.nativeElement.textContent).toEqual('');
    });
  });
});

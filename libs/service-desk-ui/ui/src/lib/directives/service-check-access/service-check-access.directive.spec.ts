import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { Component, TemplateRef, ViewContainerRef } from '@angular/core';
import { ServiceCheckAccessDirective } from './service-check-access.directive';

import {
  ServicePermission,
  ServiceVM,
  ServicePolicyService,
  ServicePolicyServiceStub,
} from '@orbita/service-desk-ui/domain-logic';

@Component({
  template: `<div *libServiceCheckAccess="permission.VIEW_MANAGE_INFO; object: service">Тестовый компонент</div>`,
})
class TestContainerComponent {
  permission = ServicePermission;
  service = {} as ServiceVM;
}

describe('ServiceCheckAccessDirective', () => {
  let fixture: ComponentFixture<TestContainerComponent>;
  let component: TestContainerComponent;
  let directive: ServiceCheckAccessDirective;
  let policy: ServicePolicyService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [TestContainerComponent, ServiceCheckAccessDirective],
        providers: [
          ServiceCheckAccessDirective,
          TemplateRef,
          ViewContainerRef,
          { provide: ServicePolicyService, useClass: ServicePolicyServiceStub },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TestContainerComponent);
    component = fixture.componentInstance;
    directive = TestBed.inject(ServiceCheckAccessDirective);
    policy = TestBed.inject(ServicePolicyService);
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

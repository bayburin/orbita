import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { Component, TemplateRef, ViewContainerRef } from '@angular/core';
import { QuestionCheckAccessDirective } from './question-check-access.directive';

import {
  QuestionPermission,
  QuestionVM,
  QuestionPolicyService,
  QuestionPolicyServiceStub,
} from '@orbita/service-desk-ui/domain-logic';

@Component({
  template: `<div *libQuestionCheckAccess="permission.VIEW_MANAGE_INFO; object: question">Тестовый компонент</div>`,
})
class TestContainerComponent {
  permission = QuestionPermission;
  question = {} as QuestionVM;
}

describe('QuestionCheckAccessDirective', () => {
  let fixture: ComponentFixture<TestContainerComponent>;
  let component: TestContainerComponent;
  let directive: QuestionCheckAccessDirective;
  let policy: QuestionPolicyService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [TestContainerComponent, QuestionCheckAccessDirective],
        providers: [
          QuestionCheckAccessDirective,
          TemplateRef,
          ViewContainerRef,
          { provide: QuestionPolicyService, useClass: QuestionPolicyServiceStub },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TestContainerComponent);
    component = fixture.componentInstance;
    directive = TestBed.inject(QuestionCheckAccessDirective);
    policy = TestBed.inject(QuestionPolicyService);
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

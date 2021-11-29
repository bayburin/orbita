import { ComponentFixture, TestBed, inject, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, SimpleChange } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';

import { ServiceDetailComponent } from './service-detail.component';
import { ServiceFactory } from '@modules/ticket/factories/service.factory';
import { TicketI } from '@interfaces/ticket.interface';
import { UserService } from '@shared/services/user/user.service';
import { AuthorizeDirective } from '@shared/directives/authorize/authorize.directive';
import { StubUserService, user } from '@shared/services/user/user.service.stub';
import { ServicePolicy } from '@shared/policies/service/service.policy';
import { StubServicePolicy } from '@shared/policies/service/service.policy.stub';
import { TicketTypes } from '@modules/ticket/models/ticket/ticket.model';

describe('ServiceDetailComponent', () => {
  let component: ServiceDetailComponent;
  let fixture: ComponentFixture<ServiceDetailComponent>;
  const questions = [
    { id: 1, service_id: 1, name: 'Тестовый вопрос 1', state: 'published' },
    { id: 2, service_id: 1, name: 'Тестовый вопрос 2', status: 'published' },
  ] as TicketI[];
  const service = ServiceFactory.create({
    id: 1,
    category_id: 1,
    name: 'Тестовая услуга',
    questions,
    responsible_users: [{ tn: 12_123 }],
  });

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [NoopAnimationsModule, RouterTestingModule],
        declarations: [ServiceDetailComponent, AuthorizeDirective],
        schemas: [NO_ERRORS_SCHEMA],
        providers: [
          { provide: ServicePolicy, useClass: StubServicePolicy },
          { provide: UserService, useClass: StubUserService },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceDetailComponent);
    component = fixture.componentInstance;
    component.service = service;
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should show service-desk-ui-section-header component', () => {
    fixture.detectChanges();

    expect(fixture.debugElement.nativeElement.querySelector('service-desk-ui-section-header')).toBeTruthy();
  });

  // it('should show service-desk-ui-dynamic-template-content component', () => {
  //   fixture.detectChanges();

  //   expect(fixture.debugElement.nativeElement.querySelectorAll('service-desk-ui-dynamic-template-content').length).toEqual(tickets.length);
  // });

  it('should show service-desk-ui-question-page-content component', () => {
    fixture.detectChanges();

    expect(fixture.debugElement.nativeElement.querySelectorAll('service-desk-ui-question-page-content').length).toEqual(
      questions.length
    );
  });

  it('should show service-desk-ui-responsible-user-details component', () => {
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('service-desk-ui-responsible-user-details'))).toBeTruthy();
  });

  describe('when libAuthorize directive returns true', () => {
    beforeEach(() => {
      user.role.name = 'content_manager';
      const servicePolicy = TestBed.get(ServicePolicy);
      spyOn(servicePolicy, 'authorize').and.returnValue(true);

      fixture.detectChanges();
    });

    it('should open admin mode', inject([Router], (router: Router) => {
      const spy = spyOn(router, 'navigateByUrl');
      fixture.debugElement.nativeElement.querySelector('#adminMode').click();

      expect(`${spy.calls.first().args[0]}`).toEqual('/admin/tickets');
    }));
  });

  it('should change showTicketFlags attribute', () => {
    const policy = TestBed.get(ServicePolicy);
    spyOn(policy, 'authorize').and.returnValue(true);
    component.ngOnChanges({
      service: new SimpleChange(null, service, true),
    });
    fixture.detectChanges();

    expect(component.showTicketFlags).toBeTruthy();
  });
});

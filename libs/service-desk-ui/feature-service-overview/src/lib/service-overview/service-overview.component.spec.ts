import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  QuestionFacade,
  QuestionFacadeStub,
  ServiceFacade,
  ServiceFacadeStub,
  EmployeeFacade,
  EmployeeFacadeStub,
  AttachmentFacade,
  AttachmentFacadeStub,
} from '@orbita/service-desk-ui/domain-logic';
import { ServiceOverviewComponent } from './service-overview.component';

describe('ServiceOverviewComponent', () => {
  let component: ServiceOverviewComponent;
  let fixture: ComponentFixture<ServiceOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServiceOverviewComponent],
      providers: [
        { provide: ServiceFacade, useClass: ServiceFacadeStub },
        { provide: QuestionFacade, useClass: QuestionFacadeStub },
        { provide: AttachmentFacade, useClass: AttachmentFacadeStub },
        { provide: EmployeeFacade, useClass: EmployeeFacadeStub },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

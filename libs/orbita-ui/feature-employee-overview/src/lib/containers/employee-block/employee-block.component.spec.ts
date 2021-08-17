import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { EmployeeFacade, EmployeeFacadeStub } from '@orbita/orbita-ui/domain-logic';

import { EmployeeBlockComponent } from './employee-block.component';

describe('EmployeeBlockComponent', () => {
  let component: EmployeeBlockComponent;
  let fixture: ComponentFixture<EmployeeBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeBlockComponent],
      providers: [{ provide: EmployeeFacade, useClass: EmployeeFacadeStub }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

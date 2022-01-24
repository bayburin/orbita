import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceHasCommonCaseTypeComponent } from './service-has-common-case-type.component';

describe('ServiceHasCommonCaseTypeComponent', () => {
  let component: ServiceHasCommonCaseTypeComponent;
  let fixture: ComponentFixture<ServiceHasCommonCaseTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceHasCommonCaseTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceHasCommonCaseTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

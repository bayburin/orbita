import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceIsHiddenTypeComponent } from './service-is-hidden-type.component';

describe('ServiceIsHiddenTypeComponent', () => {
  let component: ServiceIsHiddenTypeComponent;
  let fixture: ComponentFixture<ServiceIsHiddenTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceIsHiddenTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceIsHiddenTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

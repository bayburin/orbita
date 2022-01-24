import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminServicesTableComponent } from './admin-services-table.component';

describe('AdminServicesTableComponent', () => {
  let component: AdminServicesTableComponent;
  let fixture: ComponentFixture<AdminServicesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminServicesTableComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminServicesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

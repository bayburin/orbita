import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCategoriesTableComponent } from './admin-categories-table.component';

describe('AdminCategoriesTableComponent', () => {
  let component: AdminCategoriesTableComponent;
  let fixture: ComponentFixture<AdminCategoriesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCategoriesTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCategoriesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

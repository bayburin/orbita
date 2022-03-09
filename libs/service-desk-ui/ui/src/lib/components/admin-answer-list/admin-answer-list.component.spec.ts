import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAnswerListComponent } from './admin-answer-list.component';

describe('AdminAnswerListComponent', () => {
  let component: AdminAnswerListComponent;
  let fixture: ComponentFixture<AdminAnswerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAnswerListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAnswerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

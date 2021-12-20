import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterTemplateComponent } from './filter-template.component';

describe('FilterTemplateComponent', () => {
  let component: FilterTemplateComponent;
  let fixture: ComponentFixture<FilterTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterTemplateComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterTemplateComponent);
    component = fixture.componentInstance;
    component.filters = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

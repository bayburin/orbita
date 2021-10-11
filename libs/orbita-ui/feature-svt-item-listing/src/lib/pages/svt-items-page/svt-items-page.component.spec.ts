import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvtItemsPageComponent } from './svt-items-page.component';

describe('SvtItemsPageComponent', () => {
  let component: SvtItemsPageComponent;
  let fixture: ComponentFixture<SvtItemsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SvtItemsPageComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SvtItemsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

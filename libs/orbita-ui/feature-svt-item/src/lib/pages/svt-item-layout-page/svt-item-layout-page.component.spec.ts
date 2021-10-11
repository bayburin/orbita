import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { SvtItemLayoutPageComponent } from './svt-item-layout-page.component';

describe('SvtItemLayoutPageComponent', () => {
  let component: SvtItemLayoutPageComponent;
  let fixture: ComponentFixture<SvtItemLayoutPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [SvtItemLayoutPageComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SvtItemLayoutPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

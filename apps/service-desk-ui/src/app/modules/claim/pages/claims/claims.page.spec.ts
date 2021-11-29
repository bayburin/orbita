import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { ClaimsPageComponent } from './claims.page';

describe('ClaimsPageComponent', () => {
  let component: ClaimsPageComponent;
  let fixture: ComponentFixture<ClaimsPageComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ClaimsPageComponent],
        schemas: [NO_ERRORS_SCHEMA],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render service-desk-ui-claims-page-content component', () => {
    expect(fixture.debugElement.nativeElement.querySelector('service-desk-ui-claims-page-content')).toBeTruthy();
  });
});

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { AuthorizeForbiddenPageComponent } from './authorize-forbidden.page';

describe('AuthorizeForbiddenPageComponent', () => {
  let component: AuthorizeForbiddenPageComponent;
  let fixture: ComponentFixture<AuthorizeForbiddenPageComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [AuthorizeForbiddenPageComponent],
        schemas: [NO_ERRORS_SCHEMA],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorizeForbiddenPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed, inject, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

import { LogoutPageComponent } from './logout.page';
import { AuthService } from '@auth/auth.service';
import { StubAuthService } from '@auth/auth.service.stub';

describe('LogoutPageComponent', () => {
  let component: LogoutPageComponent;
  let fixture: ComponentFixture<LogoutPageComponent>;
  let authService: AuthService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [LogoutPageComponent],
        schemas: [NO_ERRORS_SCHEMA],
        providers: [{ provide: AuthService, useClass: StubAuthService }],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutPageComponent);
    component = fixture.componentInstance;
    authService = TestBed.get(AuthService);
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should class "unauthorize" method for AuthService', () => {
    spyOn(authService, 'unauthorize').and.callThrough();
    fixture.detectChanges();

    expect(authService.unauthorize).toHaveBeenCalled();
  });

  describe('#authorize', () => {
    it('should call AuthService#authorize method', () => {
      spyOn(authService, 'authorize');
      component.authorize();

      expect(authService.authorize).toHaveBeenCalled();
    });
  });
});

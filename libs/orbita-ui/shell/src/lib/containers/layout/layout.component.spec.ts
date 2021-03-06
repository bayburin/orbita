import { LayoutFacade, LayoutFacadeStub } from '@orbita/shared/domain-logic';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { AppFacade, AppFacadeStub } from '@orbita/orbita-ui/domain-logic';
import { AuthHelper, AuthHelperStub } from '@iss/ng-auth-center';
import { ConfirmationService } from 'primeng/api';

import { LayoutComponent } from './layout.component';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;
  let userFacade: AppFacade;
  let layoutFacade: LayoutFacade;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, NoopAnimationsModule],
      declarations: [LayoutComponent],
      providers: [
        { provide: AppFacade, useClass: AppFacadeStub },
        { provide: AuthHelper, useClass: AuthHelperStub },
        { provide: LayoutFacade, useClass: LayoutFacadeStub },
        ConfirmationService,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    userFacade = TestBed.inject(AppFacade);
    layoutFacade = TestBed.inject(LayoutFacade);
    jest.spyOn(userFacade, 'init');
    jest.spyOn(layoutFacade, 'initTheme');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('userFacade() should call init', () => {
    expect(userFacade.init).toHaveBeenCalled();
  });

  it('layoutFacade() should call initTheme', () => {
    expect(layoutFacade.initTheme).toHaveBeenCalled();
  });

  describe('setTheme()', () => {
    it('should call setTheme method', () => {
      const spy = jest.spyOn(layoutFacade, 'setTheme');
      component.setTheme('fake-theme');

      expect(spy).toHaveBeenCalledWith('fake-theme');
    });
  });
});

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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, NoopAnimationsModule],
      declarations: [LayoutComponent],
      providers: [
        { provide: AppFacade, useClass: AppFacadeStub },
        { provide: AuthHelper, useClass: AuthHelperStub },
        ConfirmationService,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    userFacade = TestBed.inject(AppFacade);
    spyOn(userFacade, 'init');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('userFacade() should call init', () => {
    expect(userFacade.init).toHaveBeenCalled();
  });
});

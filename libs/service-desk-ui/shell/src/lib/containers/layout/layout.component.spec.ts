import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  AppFacade,
  AppFacadeStub,
  NotificationFacade,
  NotificationFacadeStub,
  RouterFacade,
  RouterFacadeStub,
} from '@orbita/service-desk-ui/domain-logic';

import { LayoutComponent } from './layout.component';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, NoopAnimationsModule],
      declarations: [LayoutComponent],
      providers: [
        { provide: AppFacade, useClass: AppFacadeStub },
        { provide: NotificationFacade, useClass: NotificationFacadeStub },
        { provide: RouterFacade, useClass: RouterFacadeStub },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { UserFacade, UserFacadeStub } from '@orbita/ticket-system/domain-logic';

import { LayoutComponent } from './layout.component';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;
  let userFacade: UserFacade;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [LayoutComponent],
      providers: [{ provide: UserFacade, useClass: UserFacadeStub }],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    userFacade = TestBed.inject(UserFacade);
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

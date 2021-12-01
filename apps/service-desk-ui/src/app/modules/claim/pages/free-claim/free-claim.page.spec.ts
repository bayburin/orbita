import { ComponentFixture, TestBed, inject, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { FreeClaimPageComponent } from './free-claim.page';
import { By } from '@angular/platform-browser';

describe('FreeClaimPageComponent', () => {
  let component: FreeClaimPageComponent;
  let fixture: ComponentFixture<FreeClaimPageComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule],
        declarations: [FreeClaimPageComponent],
        schemas: [NO_ERRORS_SCHEMA],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FreeClaimPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show header', () => {
    expect(fixture.debugElement.nativeElement.querySelector('service-desk-ui-section-header')).toBeTruthy();
    expect(
      fixture.debugElement.query(By.css('service-desk-ui-section-header')).nativeElement.getAttribute('header')
    ).toEqual('Запрос в техподдержку');
  });

  it('should show service-desk-ui-free-claim-form component', () => {
    expect(fixture.debugElement.nativeElement.querySelector('service-desk-ui-free-claim-form')).toBeTruthy();
  });

  it('should set "new" value to the formType property', () => {
    expect(
      fixture.debugElement.query(By.css('service-desk-ui-free-claim-form')).nativeElement.getAttribute('formType')
    ).toEqual('new');
  });

  it('should redirect to claims page', inject([Router], (router: Router) => {
    const spy = spyOn(router, 'navigateByUrl');
    component.onSave();

    expect(`${spy.calls.first().args[0]}`).toEqual('/claims');
  }));
});
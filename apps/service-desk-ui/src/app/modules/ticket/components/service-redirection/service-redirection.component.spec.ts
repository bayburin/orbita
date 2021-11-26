import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ServiceRedirectionComponent } from './service-redirection.component';
import { StubServiceService } from '@shared/services/service/service.service.stub';
import { ServiceService } from '@shared/services/service/service.service';

describe('ServiceRedirectionComponent', () => {
  let component: ServiceRedirectionComponent;
  let fixture: ComponentFixture<ServiceRedirectionComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ServiceRedirectionComponent],
        schemas: [NO_ERRORS_SCHEMA],
        providers: [{ provide: ServiceService, useClass: StubServiceService }],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceRedirectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

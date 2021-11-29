import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, Component } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { UnauthorizeContentComponent } from './unauthorize-content.component';

describe('UnauthorizeContentComponent', () => {
  let component: UnauthorizeContentComponent;
  let fixture: ComponentFixture<UnauthorizeContentComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [UnauthorizeContentComponent],
        schemas: [NO_ERRORS_SCHEMA],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(UnauthorizeContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show occured content', () => {});
});

@Component({
  template: '<service-desk-ui-unauthorize-content><span>testing</span></service-desk-ui-unauthorize-content>',
})
export class ContentProjectionTesterComponent {}

describe('ContentProjectionTesterComponent', () => {
  let component: ContentProjectionTesterComponent;
  let fixture: ComponentFixture<ContentProjectionTesterComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ContentProjectionTesterComponent, UnauthorizeContentComponent],
        schemas: [NO_ERRORS_SCHEMA],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentProjectionTesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should works content projection', () => {
    const innerHtml = fixture.debugElement.nativeElement.innerHTML;

    expect(innerHtml).toContain('testing');
  });
});

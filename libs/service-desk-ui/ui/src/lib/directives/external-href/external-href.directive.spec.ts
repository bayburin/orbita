import { Component, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentFixture, waitForAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { UserRecommendation } from '@orbita/service-desk-ui/domain-logic';

import { ExternalHrefDirective } from './external-href.directive';

@Component({
  template: `<a [libExternalHref]="rec">Тестовая ссылка</a>`,
})
class TestContainerComponent {
  rec: UserRecommendation;
}

class MockElementRef implements ElementRef {
  nativeElement = {};
}

describe('ExternalHrefDirective', () => {
  let fixture: ComponentFixture<TestContainerComponent>;
  let component: TestContainerComponent;
  let directive: ExternalHrefDirective;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [CommonModule],
        declarations: [TestContainerComponent, ExternalHrefDirective],
        providers: [ExternalHrefDirective, { provide: ElementRef, useValue: { useValue: new MockElementRef() } }],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TestContainerComponent);
    component = fixture.componentInstance;
    component.rec = {
      link: 'https://test',
      query_params: {
        foo: 'bar',
        fake: 'data',
      },
    } as unknown as UserRecommendation;
    directive = TestBed.inject(ExternalHrefDirective);
  });

  it('should create an instance', () => {
    fixture.detectChanges();

    expect(directive).toBeTruthy();
  });

  it('should create href attribute', () => {
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('a')).nativeElement.getAttribute('href')).toBe(
      'https://test?foo=bar&fake=data'
    );
  });
});

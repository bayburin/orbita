import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';
import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { Component, Renderer2, TemplateRef, ViewContainerRef, NO_ERRORS_SCHEMA } from '@angular/core';

import { LoadingIndicatorDirective } from './loading-indicator.directive';

@Component({
  template: `<div *libLoadingIndicator="id; loadingIds: loadingIds">Тестовый компонент</div>`,
})
class TestContainerComponent {
  id: number;
  loadingIds: number[];
}

describe('LoadingIndicatorDirective', () => {
  let fixture: ComponentFixture<TestContainerComponent>;
  let component: TestContainerComponent;
  let directive: LoadingIndicatorDirective;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [CommonModule],
        declarations: [TestContainerComponent, LoadingIndicatorDirective],
        providers: [LoadingIndicatorDirective, TemplateRef, ViewContainerRef, Renderer2],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TestContainerComponent);
    component = fixture.componentInstance;
    component.id = 1;
    directive = TestBed.inject(LoadingIndicatorDirective);
  });
  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  describe('when loadingIds does not have specified id', () => {
    it('should show original template', () => {
      component.loadingIds = [2, 3];
      fixture.detectChanges();

      expect(fixture.debugElement.nativeElement.textContent).toEqual('Тестовый компонент');
    });
  });

  describe('when loadingIds contains specified id', () => {
    it('should show original template', () => {
      component.loadingIds = [2, 1, 3];
      fixture.detectChanges();
      const componentEl = fixture.debugElement.query(By.css('lib-loading'));

      expect(componentEl).toBeTruthy();
      expect(componentEl.nativeElement.getAttribute('class')).toBe('text-secondary');
    });
  });
});

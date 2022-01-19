import { By } from '@angular/platform-browser';
import { Component, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentFixture, waitForAsync, TestBed } from '@angular/core/testing';

import { DisableOnLoadingDirective } from './disable-on-loading.directive';

@Component({
  template: `<button [libDisableOnLoading]="id" [libDisableOnLoadingIds]="loadingIds">Тестовая кнопка</button>`,
})
class TestContainerComponent {
  id: number;
  loadingIds: number[];
}

class MockElementRef implements ElementRef {
  nativeElement = {};
}

describe('DisableOnLoadingDirective', () => {
  let fixture: ComponentFixture<TestContainerComponent>;
  let component: TestContainerComponent;
  let directive: DisableOnLoadingDirective;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [CommonModule],
        declarations: [TestContainerComponent, DisableOnLoadingDirective],
        providers: [DisableOnLoadingDirective, { provide: ElementRef, useValue: { useValue: new MockElementRef() } }],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TestContainerComponent);
    component = fixture.componentInstance;
    component.id = 1;
    directive = TestBed.inject(DisableOnLoadingDirective);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  describe('when loadingIds does not have specified id', () => {
    it('should show original template', () => {
      component.loadingIds = [2, 3];
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('button')).nativeElement.disabled).toBe(false);
    });
  });

  describe('when loadingIds contains specified id', () => {
    it('should show original template', () => {
      component.loadingIds = [1, 2, 3];
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('button')).nativeElement.disabled).toBe(true);
    });
  });
});

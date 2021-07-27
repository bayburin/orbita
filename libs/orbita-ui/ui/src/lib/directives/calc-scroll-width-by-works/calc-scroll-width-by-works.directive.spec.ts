import { TestBed, ComponentFixture } from '@angular/core/testing';
import {
  Component,
  QueryList,
  ViewChild,
  ElementRef,
  ChangeDetectionStrategy,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { By } from '@angular/platform-browser';

import { CalcScrollWidthByWorksDirective } from './calc-scroll-width-by-works.directive';

@Component({
  template: `
    <div id="parentElement" libCalcScrollWidthByWorks [calculatedElements]="elements">
      <div #elements *ngFor="let el of list" style="width: 300px">fake element</div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TestContainerComponent {
  @ViewChild('elements') elements: QueryList<ElementRef>;
  list = [1, 2, 3];
}

describe('CalcScrollWidthByWorksDirective', () => {
  let fixture: ComponentFixture<TestContainerComponent>;
  let component: TestContainerComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestContainerComponent, CalcScrollWidthByWorksDirective],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });

    fixture = TestBed.createComponent(TestContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeDefined();
  });

  // it('should set width of element which has current directive', () => {
  //   const el = fixture.debugElement.query(By.css('#parentElement'));

  //   expect(el.nativeElement.offsetWidth).toBe('898px');
  // });
});

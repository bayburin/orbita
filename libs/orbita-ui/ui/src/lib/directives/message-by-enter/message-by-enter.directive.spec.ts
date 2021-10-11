import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';

import { MessageByEnterDirective } from './message-by-enter.directive';

@Component({
  selector: 'lib-test-component',
  template: '<textarea libMessageByEnter (sendMessage)="send()"></textarea>',
})
class TestComponent {
  send(): void {
    /** */
  }
}

describe('MessageByEnterDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let directiveEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, MessageByEnterDirective],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).createComponent(TestComponent);

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    directiveEl = fixture.debugElement.query(By.css('textarea'));
  });

  it('should call send() method', () => {
    const spy = jest.spyOn(component, 'send');
    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    directiveEl.nativeElement.dispatchEvent(event);
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  });

  it('should not call send() method if keydown Alt+Enter', () => {
    const spy = jest.spyOn(component, 'send');
    const event1 = new KeyboardEvent('keydown', { key: 'Alt' });
    const event2 = new KeyboardEvent('keydown', { key: 'Enter' });
    directiveEl.nativeElement.dispatchEvent(event1);
    directiveEl.nativeElement.dispatchEvent(event2);
    fixture.detectChanges();

    expect(spy).not.toHaveBeenCalled();
  });

  it('should not call send() method if keydown Control+Enter', () => {
    const spy = jest.spyOn(component, 'send');
    const event1 = new KeyboardEvent('keydown', { key: 'Control' });
    const event2 = new KeyboardEvent('keydown', { key: 'Enter' });
    directiveEl.nativeElement.dispatchEvent(event1);
    directiveEl.nativeElement.dispatchEvent(event2);
    fixture.detectChanges();

    expect(spy).not.toHaveBeenCalled();
  });

  it('should not call send() method if keydown Shift+Enter', () => {
    const spy = jest.spyOn(component, 'send');
    const event1 = new KeyboardEvent('keydown', { key: 'Shift' });
    const event2 = new KeyboardEvent('keydown', { key: 'Enter' });
    directiveEl.nativeElement.dispatchEvent(event1);
    directiveEl.nativeElement.dispatchEvent(event2);
    fixture.detectChanges();

    expect(spy).not.toHaveBeenCalled();
  });
});

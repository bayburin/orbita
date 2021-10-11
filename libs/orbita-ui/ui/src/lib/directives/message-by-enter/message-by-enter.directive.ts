import { Directive, HostListener, EventEmitter, Output, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[libMessageByEnter]',
})
export class MessageByEnterDirective {
  /**
   * Событие отправки сообщения
   */
  @Output() sendMessage = new EventEmitter<void>();
  /**
   * Содержит состояния нажатия клавиш "Alt", "Shift", "Control"
   */
  keyState = {
    altKey: false,
    shiftKey: false,
    ctrlKey: false,
  };

  constructor(private elRef: ElementRef) {}

  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Alt') {
      this.keyState.altKey = true;
    }
    if (event.key === 'Control') {
      this.keyState.ctrlKey = true;
    }
    if (event.key === 'Shift') {
      this.keyState.shiftKey = true;
    }

    if (event.key === 'Enter' && (this.keyState.altKey || this.keyState.shiftKey || this.keyState.ctrlKey)) {
      event.preventDefault();
      this.elRef.nativeElement.value = this.elRef.nativeElement.value + '\r\n';
    } else if (event.key === 'Enter') {
      event.preventDefault();
      this.sendMessage.emit();
    }
  }

  @HostListener('keyup', ['$event']) onKeyUp(event: KeyboardEvent): void {
    if (event.key === 'Alt') {
      this.keyState.altKey = false;
    }
    if (event.key === 'Control') {
      this.keyState.ctrlKey = false;
    }
    if (event.key === 'Shift') {
      this.keyState.shiftKey = false;
    }
  }
}

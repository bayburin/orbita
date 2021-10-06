import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
  ViewChild,
  ElementRef,
  OnChanges,
} from '@angular/core';
import { MessageViewModel } from '@orbita/orbita-ui/domain-logic';

@Component({
  selector: 'lib-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentsComponent implements OnChanges {
  /**
   * Список комментариев к заявке
   */
  @Input() comments: MessageViewModel[];
  /**
   * Событие отправки комментария
   */
  @Output() sendMessage = new EventEmitter<string>();
  /**
   * Поле ввода комментария
   */
  @ViewChild('comment') comment: ElementRef;
  /**
   * Содержит состояния нажатия клавиш "Alt", "Shift", "Control"
   */
  private keyState = {
    altKey: false,
    shiftKey: false,
    ctrlKey: false,
  };

  trackByComment(index: number, comment: MessageViewModel): number {
    return comment.id;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const comments = changes.comments;

    if (comments && comments.currentValue) {
      const current = comments.currentValue;
      const id = current[current.length - 1].id;

      setTimeout(() => {
        const el = document.getElementById(id);

        el.scrollIntoView({ behavior: 'auto', block: 'start' });
      }, 100);
    }
  }

  keydown(event: KeyboardEvent): void {
    if (event.altKey) {
      this.keyState.altKey = true;
    }
    if (event.shiftKey) {
      this.keyState.shiftKey = true;
    }
    if (event.ctrlKey) {
      this.keyState.ctrlKey = true;
    }

    if (event.key === 'Enter' && (this.keyState.altKey || this.keyState.shiftKey || this.keyState.ctrlKey)) {
      event.preventDefault();
      this.comment.nativeElement.value = this.comment.nativeElement.value + '\r\n';
    } else if (event.key === 'Enter') {
      event.preventDefault();
      this.send();
    }
  }

  keyup(event: KeyboardEvent): void {
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

  send(): void {
    if (!this.comment.nativeElement.value.trim()) {
      return;
    }

    this.sendMessage.emit(this.comment.nativeElement.value.trim());
    this.comment.nativeElement.value = '';
  }
}

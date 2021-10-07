import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
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
   * Комментарий
   */
  comment: string;
  /**
   * Список комментариев к заявке
   */
  @Input() comments: MessageViewModel[];
  /**
   * Событие отправки комментария
   */
  @Output() sendMessage = new EventEmitter<string>();
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

  /**
   * Отсылает комментарий
   */
  send(): void {
    if (!this.comment.trim()) {
      return;
    }

    this.sendMessage.emit(this.comment.trim());
    this.comment = '';
  }
}

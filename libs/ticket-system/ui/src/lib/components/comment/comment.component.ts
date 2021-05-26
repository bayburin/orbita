import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MessageViewModel } from '@orbita/ticket-system/domain-logic';

@Component({
  selector: 'lib-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent {
  /**
   * Список комментариев к заявке
   */
  @Input() comments: MessageViewModel[];
  /**
   * Событие отправки комментария
   */
  @Output() sendMessage = new EventEmitter<string>();

  trackByComment(index: number, comment: MessageViewModel): number {
    return comment.id;
  }
}

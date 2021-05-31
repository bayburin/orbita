import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MessageViewModel } from '@orbita/ticket-system/domain-logic';

@Component({
  selector: 'lib-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent {
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

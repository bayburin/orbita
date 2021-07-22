import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MessageViewModel } from '@orbita/orbita-ui/domain-logic';

@Component({
  selector: 'lib-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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

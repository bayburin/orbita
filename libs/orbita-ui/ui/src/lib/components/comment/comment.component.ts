import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MessageViewModel } from '@orbita/orbita-ui/domain-logic';

@Component({
  selector: 'lib-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentComponent {
  @Input() comment: MessageViewModel;
}

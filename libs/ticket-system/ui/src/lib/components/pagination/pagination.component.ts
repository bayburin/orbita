import { Observable, of } from 'rxjs';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'lib-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent {
  @Input() loading$: Observable<boolean> = of(null);
  @Input() page$: Observable<number> = of(null);
  @Input() totalCount$: Observable<number> = of(null);
  @Input() maxSize$: Observable<number> = of(null);
  @Output() pageChanged = new EventEmitter<number>();
}

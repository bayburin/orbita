import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'lib-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingComponent {
  /**
   * Индикатор загрузки
   */
  @Input() loading: boolean;
  /**
   * Размер иконки (18px, 24px, 36px, 48px)
   */
  @Input() size: string;
}

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'lib-section-header',
  templateUrl: './section-header.component.html',
  styleUrls: ['./section-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionHeaderComponent {
  /**
   * Текст заголовка
   */
  @Input() header: string;
  /**
   * Дополнительные стили
   */
  @Input() addClass: string;
}

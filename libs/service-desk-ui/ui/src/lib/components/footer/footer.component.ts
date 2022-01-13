import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'lib-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  /**
   * Дата, которую необходимо вывести в футере
   */
  @Input() date: string;
}

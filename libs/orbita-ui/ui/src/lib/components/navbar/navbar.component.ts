import { Component, EventEmitter, OnInit, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { CurrentUser } from '@orbita/orbita-ui/domain-logic';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'lib-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit {
  /**
   * Меню выбора темы
   */
  themeMenuItems: MenuItem[];
  /**
   * Текущий пользователь
   */
  @Input() currentUser: CurrentUser;
  /**
   * Пользовательская тема
   */
  @Input() theme: string;
  /**
   * Событие выхода из системы
   */
  @Output() logout = new EventEmitter<void>();
  /**
   * Событие выбора темы
   */
  @Output() selectThemeCss = new EventEmitter<string>();

  ngOnInit(): void {
    this.themeMenuItems = [
      {
        label: 'Светлые темы',
        items: [
          { label: 'Saga Blue', command: () => this.selectThemeCss.emit('saga-blue-theme.css') },
          { label: 'Bootstrap Blue Light', command: () => this.selectThemeCss.emit('bootstrap4-blue-light-theme.css') },
          { label: 'Material Indigo Light', command: () => this.selectThemeCss.emit('mdc-indigo-light-theme.css') },
        ],
      },
      {
        label: 'Темные темы',
        items: [
          { label: 'Vela Blue', command: () => this.selectThemeCss.emit('vela-blue-theme.css') },
          { label: 'Bootstrap Blue Dark', command: () => this.selectThemeCss.emit('bootstrap4-blue-dark-theme.css') },
          { label: 'Material Indigo Dark', command: () => this.selectThemeCss.emit('mdc-indigo-dark-theme.css') },
        ],
      },
    ];
  }
}

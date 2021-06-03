import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { CurrentUser } from '@orbita/orbita-ui/domain-logic';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'lib-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
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
   * Событие выхода из системы
   */
  @Output() logout = new EventEmitter<void>();

  ngOnInit(): void {
    this.themeMenuItems = [
      {
        label: 'Светлые темы',
        items: [
          { label: 'Saga Blue' },
          { label: 'Bootstrap Blue Light' },
          { label: 'Fluent Light' },
          { label: 'Material Indigo Light' }
        ]
      },
      {
        label: 'Темные темы',
        items: [
          { label: 'Vela Blue' },
          { label: 'Bootstrap Blue Dark' },
          { label: 'Material Indigo Dark' }
        ]
      }
    ]
  }
}

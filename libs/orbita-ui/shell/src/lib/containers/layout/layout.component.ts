import { Component, OnInit } from '@angular/core';
import { AuthHelper } from '@iss/ng-auth-center';
import { AppFacade, CurrentUser } from '@orbita/orbita-ui/domain-logic';
import { appHeaderAnimation, appContentAnimation } from '@orbita/orbita-ui/ui';
import { MenuItem, ConfirmationService, PrimeNGConfig } from 'primeng/api';
import { primeLocale } from '@orbita/orbita-ui/ui';

@Component({
  selector: 'orbita-ui-shell-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations: [appHeaderAnimation, appContentAnimation],
})
export class LayoutComponent implements OnInit {
  /**
   * Меню sidebar
   */
  menuItems: MenuItem[];
  /**
   * Текущий пользователь
   */
  currentUser: CurrentUser = this.authHelper.getJwtPayload();
  /**
   * Индикатор, загружены ли данные
   */
  loaded$ = this.appFacade.loaded$;
  /**
   * Индикатор загрузки
   */
  loading$ = this.appFacade.loading$;
  /**
   * Ошибки, возникшие при загрузке приложения
   */
  error$ = this.appFacade.error$;

  constructor(
    private appFacade: AppFacade,
    private authHelper: AuthHelper,
    private confirmationService: ConfirmationService,
    private config: PrimeNGConfig
  ) {}

  ngOnInit(): void {
    this.appFacade.init();
    this.config.setTranslation(primeLocale);
    this.menuItems = [
      {
        label: 'Сводка',
        icon: 'mdi mdi-view-dashboard-outline mdi-24px',
        routerLink: ['/dashboard'],
        routerLinkActiveOptions: { exact: true },
      },
      {
        label: 'Заявки',
        icon: 'mdi mdi-file-document-multiple-outline mdi-24px',
        routerLink: ['/tickets'],
        routerLinkActiveOptions: { exact: true },
      },
      {
        label: 'Работники',
        icon: 'mdi mdi-account-multiple-outline mdi-24px',
        routerLink: ['/employees'],
        routerLinkActiveOptions: { exact: true },
      },
      {
        label: 'Хосты',
        icon: 'mdi mdi-network-outline mdi-24px',
        routerLink: ['/hosts'],
        routerLinkActiveOptions: { exact: true },
      },
      {
        label: 'Техника',
        icon: 'mdi mdi-desktop-classic mdi-24px',
        routerLink: ['/svt-items'],
        routerLinkActiveOptions: { exact: true },
      },
    ];
  }

  /**
   * Выходит из системы
   */
  logout(): void {
    this.confirmationService.confirm({
      message: 'Вы действительно хотите выйти из системы?',
      acceptLabel: 'Да',
      rejectLabel: 'Нет',
      accept: () => this.authHelper.logout(),
    });
  }
}

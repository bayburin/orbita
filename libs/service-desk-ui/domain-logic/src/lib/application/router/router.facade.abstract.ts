import { Observable } from 'rxjs';
import { MenuItem } from 'primeng/api';

export class RouterFacadeAbstract {
  /**
   * Массив меню-объектов для построения "хлебных крошек"
   */
  breadcrumbMenu$: Observable<MenuItem[]>;
}

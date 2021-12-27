import { MenuItem } from 'primeng/api';
import { ActivatedRouteSnapshot } from '@angular/router';
import { getSelectors, RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { BreadcrumbRoute, BreadcrumbValueTypes } from './../../../entities/breadcrumb-route.interface';
import { Service } from '../../../entities/models/service.interface';
import { Category } from '../../../entities/models/category.interface';
import * as CategorySelectors from '../category/category.selectors';
import * as ServiceSelectors from '../service/service.selectors';

export const selectRouter = createFeatureSelector<RouterReducerState>('router');

export const {
  selectCurrentRoute, // select the current route
  selectFragment, // select the current route fragment
  selectQueryParams, // select the current route query params
  selectQueryParam, // factory function to select a query param
  selectRouteParams, // select the current route params
  selectRouteParam, // factory function to select a route param
  selectRouteData, // select the current route data
  selectUrl, // select the current url
} = getSelectors(selectRouter);

export const breadcrumbDataSelector = createSelector(
  selectRouter,
  CategorySelectors.getSelected,
  ServiceSelectors.getSelected,
  (router, category, service) => {
    return getBreadcrumbRoute([], router.state.root, '', category, service);
  }
);

export const getNeedShowBreadcrumb = createSelector(selectUrl, (url) => url.split('?')[0] !== '/');

/**
 * Создает массив объектов MenuItem для их вывода в breadcrumb
 *
 * @param result - массив объектов MenuItem, который в итоге будет результатом
 * @param currentRoute - объект текущего маршрута
 * @param path - строка с ссылкой на текущий маршрут
 * @param category - выбранная категория
 * @param service - выбранная услуга
 */
function getBreadcrumbRoute(
  result: MenuItem[],
  currentRoute: ActivatedRouteSnapshot,
  path: string,
  category: Category,
  service: Service
): MenuItem[] {
  const breadcrumb: BreadcrumbRoute = currentRoute.data.breadcrumb;
  let label = '';

  if (breadcrumb) {
    path = `${path}${currentRoute.url.map((segment) => segment.path).join('/')}/`;

    if (result[result.length - 1]?.routerLink.replace(/\//g, '') !== path.replace(/\//g, '')) {
      switch (breadcrumb.type) {
        case BreadcrumbValueTypes.TEXT:
          label = breadcrumb.value;
          break;
        case BreadcrumbValueTypes.CATEGORY_ID:
          label = category?.name;
          break;
        case BreadcrumbValueTypes.SERVICE_ID:
          label = service?.name;
          break;
      }

      // TODO: Использовать MenuItemBuilder
      const menuItem = {
        label,
        routerLink: path,
      };
      result.push(menuItem);
    }
  }

  if (currentRoute.firstChild) {
    return getBreadcrumbRoute(result, currentRoute.firstChild, path, category, service);
  } else {
    return result;
  }
}

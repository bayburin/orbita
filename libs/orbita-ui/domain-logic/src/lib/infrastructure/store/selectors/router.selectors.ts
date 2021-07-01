import { ActivatedRouteSnapshot } from '@angular/router';
import { getSelectors, RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MenuItem } from 'primeng/api';

import { MenuItemBuilder } from './../../builders/menu-item.builder';

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

export const breadcrumbDataSelector = createSelector(selectRouter, (router) => {
  let currentRoute: ActivatedRouteSnapshot = router.state.root;
  let path = '';
  let menuItem: MenuItem;
  const result = [];

  if (currentRoute.data.breadcrumb) {
    path = `${path}${currentRoute.url.map((segment) => segment.path).join('/')}/`;
    menuItem = new MenuItemBuilder().label(currentRoute.data.breadcrumb).routerLink(path).build();
    result.push(menuItem);
  }
  while (currentRoute?.firstChild) {
    currentRoute = currentRoute.firstChild;
    const label = currentRoute.data.breadcrumb;

    if (label && result[result.length - 1]?.label !== label) {
      path = `${path}${currentRoute.url.map((segment) => segment.path).join('/')}/`;
      menuItem = new MenuItemBuilder().label(label).routerLink(path).build();
      result.push(menuItem);
    }
  }

  return result;
});

import {ComponentType} from 'react';
import {SiteRoute} from '../../types/types';
import {siteRoutes} from '../../const';

export const useBreadcrumbRoutes = (Component: ComponentType) => {
  const routes: SiteRoute[] = [];
  for (const route of siteRoutes) {
    if (route.component === Component) {
      routes.push(route);
      break;
    }
    routes.push(route);
  }
  return routes;
};

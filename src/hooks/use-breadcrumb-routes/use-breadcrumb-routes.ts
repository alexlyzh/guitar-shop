import { SiteRoute } from '../../types/types';
import { siteRoutes } from '../../const';

export const useBreadcrumbRoutes = (currentPageTitle: string) => {
  const routes: SiteRoute[] = [];
  for (const route of siteRoutes) {
    if (route.title === currentPageTitle) {
      routes.push(route);
      break;
    }
    routes.push(route);
  }
  return routes;
};

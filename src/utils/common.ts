import { KeyboardKey, screenTopOptions, siteRoutes } from '../const';
import { Comment, RemoteDataByID, RequestStatus, SiteRoute } from '../types/types';

export const isEscKeyDown = (evt: KeyboardEvent) => evt.key === KeyboardKey.ESC;

export const debounce = <A = unknown, R = void>(
  callback: (params: A) => R,
  delay: number,
) => {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (args: A) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.call(this, args), delay);
  };
};

export const getRandomInteger = (min = 0, max = 1): number => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getCommentsCount = (id: number, comments: RemoteDataByID<Comment>) => {
  switch (true) {
    case (Boolean(comments[id]) && comments[id].requestStatus === RequestStatus.PENDING):
      return 'Загрузка...';
    case (Boolean(comments[id]) && comments[id].requestStatus === RequestStatus.SUCCESS):
      return comments[id].data.length;
    default:
      return null;
  }
};

export const scrollToPageTop = () => window.scrollTo(screenTopOptions);

export const getBreadcrumbRoutes = (currentPageTitle: string) => {
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

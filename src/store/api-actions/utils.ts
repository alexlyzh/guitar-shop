import {SortSettings} from '../reducer/sort-reducer/sort-reducer';
import {FilterSettings} from '../reducer/filter-reducer/filter-reducer';
import {apiRoute, AppSearchParam, initialSort, stringCount} from '../../const';
import {BASE_API_URL} from '../../api';
import {Guitar} from '../../types/types';

export const checkStringsFilter = (currentFilter: FilterSettings) => {
  if (!currentFilter.types.length) {
    return currentFilter;
  }
  const filterUpdate = {...currentFilter};
  const availableStrings: number[] = [];
  currentFilter.types.forEach((type) => {
    const strings = stringCount[type];
    availableStrings.push(...strings);
  });
  filterUpdate.strings = currentFilter.strings.filter((string) => availableStrings.includes(string));
  return filterUpdate;
};

export const sortByNameStartingWithTemplate = (data: Guitar[], template: string) =>
  data.slice().sort((a, b) => {
    if (a.name.toLowerCase().startsWith(template) && !b.name.toLowerCase().startsWith(template)) {
      return -1;
    }
    if (b.name.toLowerCase().startsWith(template) && !a.name.toLowerCase().startsWith(template)) {
      return 1;
    }
    return 0;
  });

export const parseGuitarsData = (guitars: Guitar[]) => {
  let minPrice = 0;
  let maxPrice = 0;
  guitars.forEach((guitar) => {
    minPrice = minPrice === 0 ? guitar.price : Math.min(minPrice, guitar.price);
    maxPrice = Math.max(maxPrice, guitar.price);
  });
  return {minPrice, maxPrice};
};

export const prepareSortAction = (currentSort: SortSettings, update: SortSettings) => {
  if (!currentSort.type && !currentSort.order) {
    return {...initialSort, ...update};
  }
  return {...currentSort, ...update};
};

export const appendFilterParams = (url: URL, filter: FilterSettings) => {
  filter.priceMin && url.searchParams.append(apiRoute.search.priceMin, filter.priceMin.toString());
  filter.priceMax && url.searchParams.append(apiRoute.search.priceMax, filter.priceMax.toString());
  filter.strings.length && filter.strings.forEach((string) => {
    url.searchParams.append(apiRoute.search.stringCount, string.toString());
  });
  filter.types.length && filter.types.forEach((type) => {
    url.searchParams.append(apiRoute.search.type, type);
  });
};

export const createCatalogApiUrl = (filter: FilterSettings, sort: SortSettings) => {
  const url = new URL(apiRoute.path.guitars, BASE_API_URL);
  appendFilterParams(url, filter);
  sort.type && url.searchParams.append(apiRoute.search.sort, sort.type);
  sort.order && url.searchParams.append(apiRoute.search.order, sort.order);
  return url;
};

export const createCatalogAppUrl = (filter: FilterSettings) => {
  const url = new URL(apiRoute.path.guitars, BASE_API_URL);
  url.searchParams.set(AppSearchParam.page, filter.page.toString());
  appendFilterParams(url, filter);
  return url;
};

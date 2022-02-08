import { useLocation } from 'react-router-dom';
import { AppSearchParam, FIRST_PAGE } from '../../const';
import { useDispatch, useSelector } from 'react-redux';
import { ActionCreator } from '../../store/actions';
import { useEffect, useMemo } from 'react';
import { ActionAPI } from '../../store/api-actions/api-actions';
import { getIsCatalogInitialized } from '../../store/reducer/app-reducer/selectors';
import { getFilterIsActive } from '../../store/reducer/filter-reducer/selectors';
import { embedComments } from '../../utils/api';

export const useCatalogUrl = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const isCatalogInitialized = useSelector(getIsCatalogInitialized);
  const isFilterActive = useSelector(getFilterIsActive);
  const shouldParseCatalogUrl = !isFilterActive;
  const shouldGetGuitarsPriceRange = !isCatalogInitialized;

  useEffect(() => {
    if (shouldParseCatalogUrl) {
      dispatch(ActionCreator.setFilter({
        page: Math.max(FIRST_PAGE, Number(searchParams.get(AppSearchParam.page))),
        priceMin: Number(searchParams.get(AppSearchParam.priceMin)),
        priceMax: Number(searchParams.get(AppSearchParam.priceMax)),
        types: searchParams.getAll(AppSearchParam.type),
        strings: searchParams.getAll(AppSearchParam.stringCount).map((string) => Number(string)),
      }));
      dispatch(ActionCreator.setFilterActivity(true));
      dispatch(ActionAPI.getGuitars(embedComments(searchParams)));
    }
  }, [shouldParseCatalogUrl, searchParams, dispatch]);

  useEffect(() => {
    if (shouldGetGuitarsPriceRange) {
      dispatch(ActionAPI.getGuitarsPriceRange());
    }
  }, [shouldGetGuitarsPriceRange, dispatch]);

  return isCatalogInitialized;
};

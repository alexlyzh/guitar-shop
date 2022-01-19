import {useLocation} from 'react-router-dom';
import {AppSearchParam} from '../../const';
import {useDispatch, useSelector} from 'react-redux';
import {ActionCreator} from '../../store/actions';
import {useEffect, useMemo} from 'react';
import {ActionAPI} from '../../store/api-actions/api-actions';
import {getIsAppInitialized} from '../../store/reducer/app-reducer/selectors';

export const useCatalogUrl = () => {
  const dispatch = useDispatch();
  const shouldParseCatalogUrl = !useSelector(getIsAppInitialized);
  const location = useLocation();
  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);

  useEffect(() => {
    if (shouldParseCatalogUrl) {
      dispatch(ActionCreator.initializeApp());
      console.log('INITIALIZED') // eslint-disable-line

      dispatch(ActionCreator.setFilter({
        page: Number(searchParams.get(AppSearchParam.page)),
        priceMin: Number(searchParams.get(AppSearchParam.priceMin)),
        priceMax: Number(searchParams.get(AppSearchParam.priceMax)),
        types: searchParams.getAll(AppSearchParam.type),
        strings: searchParams.getAll(AppSearchParam.stringCount).map((string) => Number(string)),
      }));

      dispatch(ActionAPI.updateFilter());
    }
  }, [shouldParseCatalogUrl, searchParams, dispatch]);
};

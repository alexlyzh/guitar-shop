import MainLayout from '../main-layout/main-layout';
import {useSelector} from 'react-redux';
import GuitarList from './guitar-list/guitar-list';
import Spinner from '../common/spinner/spinner';
import {RequestStatus} from '../../types/types';
import Breadcrumbs from '../common/breadcrumbs/breadcrumbs';
import {getGuitars} from '../../store/reducer/data-reducer/selectors';
import CatalogFilter from './filter-form/catalog-filter';
import {MIN_CATALOG_HEIGHT} from '../../const';

function CatalogPage(): JSX.Element {
  const guitars = useSelector(getGuitars);
  const isFetchingData = guitars.requestStatus === RequestStatus.PENDING;

  if (guitars.requestStatus === RequestStatus.ERROR) {
    return (
      <MainLayout>
        <Breadcrumbs />
        <p style={{display: 'flex', justifyContent: 'center'}}>
          Что-то сломалось, попробуйте перезагрузить страницу
        </p>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Breadcrumbs />

      <div className="catalog" style={{minHeight: MIN_CATALOG_HEIGHT}}>
        <CatalogFilter />
        {isFetchingData ? <Spinner /> : <GuitarList guitars={guitars.data}/>}
      </div>
    </MainLayout>
  );
}

export default CatalogPage;

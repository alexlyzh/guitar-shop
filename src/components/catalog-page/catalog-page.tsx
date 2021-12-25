import {Link} from 'react-router-dom';
import MainLayout from '../main-layout/main-layout';
import {AppRoute} from '../../const';
import {useSelector} from 'react-redux';
import {getGuitars} from '../../store/reducer/data-reducer/selectors';
import GuitarList from './guitar-list/guitar-list';
import Spinner from '../common/spinner/spinner';
import {RequestStatus} from '../../types/types';

function CatalogPage(): JSX.Element {
  const guitars = useSelector(getGuitars);
  console.log(guitars) // eslint-disable-line

  return (
    <MainLayout>
      <div className="container">
        <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
        <ul className="breadcrumbs page-content__breadcrumbs">
          <li className="breadcrumbs__item">
            <Link className="link" to={AppRoute.Root}>Главная</Link>
          </li>
          <li className="breadcrumbs__item">
            <Link className="link" to={AppRoute.Root}>Каталог</Link>
          </li>
        </ul>
        <div className="catalog">
          <form className="catalog-filter">
            <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
            <fieldset className="catalog-filter__block">
              <legend className="catalog-filter__block-title">Цена, ₽</legend>
              <div className="catalog-filter__price-range">
                <div className="form-input">
                  <label className="visually-hidden">Минимальная цена</label>
                  <input type="number" placeholder="1 000" id="priceMin" name="от"/>
                </div>
                <div className="form-input">
                  <label className="visually-hidden">Максимальная цена</label>
                  <input type="number" placeholder="30 000" id="priceMax" name="до"/>
                </div>
              </div>
            </fieldset>
            <fieldset className="catalog-filter__block">
              <legend className="catalog-filter__block-title">Тип гитар</legend>
              <div className="form-checkbox catalog-filter__block-item">
                <input className="visually-hidden" type="checkbox" id="acoustic" name="acoustic"/>
                <label htmlFor="acoustic">Акустические гитары</label>
              </div>
              <div className="form-checkbox catalog-filter__block-item">
                <input className="visually-hidden" type="checkbox" id="electric" name="electric"/>
                <label htmlFor="electric">Электрогитары</label>
              </div>
              <div className="form-checkbox catalog-filter__block-item">
                <input className="visually-hidden" type="checkbox" id="ukulele" name="ukulele"/>
                <label htmlFor="ukulele">Укулеле</label>
              </div>
            </fieldset>
            <fieldset className="catalog-filter__block">
              <legend className="catalog-filter__block-title">Количество струн</legend>
              <div className="form-checkbox catalog-filter__block-item">
                <input className="visually-hidden" type="checkbox" id="4-strings" name="4-strings"/>
                <label htmlFor="4-strings">4</label>
              </div>
              <div className="form-checkbox catalog-filter__block-item">
                <input className="visually-hidden" type="checkbox" id="6-strings" name="6-strings"/>
                <label htmlFor="6-strings">6</label>
              </div>
              <div className="form-checkbox catalog-filter__block-item">
                <input className="visually-hidden" type="checkbox" id="7-strings" name="7-strings"/>
                <label htmlFor="7-strings">7</label>
              </div>
              <div className="form-checkbox catalog-filter__block-item">
                <input className="visually-hidden" type="checkbox" id="12-strings" name="12-strings"/>
                <label htmlFor="12-strings">12</label>
              </div>
            </fieldset>
          </form>

          {guitars.requestStatus === RequestStatus.PENDING ? <Spinner /> : <GuitarList guitars={guitars.data}/>}

        </div>
      </div>
    </MainLayout>
  );
}

export default CatalogPage;

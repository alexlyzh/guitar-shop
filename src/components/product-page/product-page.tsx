import MainLayout from '../main-layout/main-layout';
import {AppMessage, GuitarType} from '../../const';
import Breadcrumbs from '../common/breadcrumbs/breadcrumbs';
import {useParams, Link} from 'react-router-dom';
import {useGuitar} from '../../hooks/use-guitar/use-guitar';
import {useComments} from '../../hooks/use-comments/use-comments';
import Spinner from '../common/spinner/spinner';
import StarRating from '../common/star-rating/star-rating';
import Reviews from './reviews/reviews';
import TabContainer from './tab-container/tab-container';

type PageParams = {
  id: string,
}

function ProductPage(): JSX.Element {
  const params: PageParams = useParams();
  const id = Number(params.id);
  const {product, isErrorLoadingGuitars, isFetchingGuitars} = useGuitar(id);
  const comments = useComments([], id);

  if (isErrorLoadingGuitars) {
    return (
      <MainLayout>
        <Breadcrumbs />
        <p style={{display: 'flex', justifyContent: 'center'}}>
          {AppMessage.ErrorOnGetGuitars}
        </p>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <h1 className="page-content__title title title--bigger">{AppMessage.ProductPageHeading}</h1>
      <Breadcrumbs />

      {isFetchingGuitars || !product ? <Spinner marginTop={'5em'} /> :
        <>
          <div className="product-container">
            <img className="product-container__img" src={product.previewImg} width="90" height="235" alt=""/>
            <div className="product-container__info-wrapper">
              <h2 className="product-container__title title title--big title--uppercase">{product.name}</h2>
              <div className="rate product-container__rating" aria-hidden="true">
                <span className="visually-hidden">Рейтинг:</span>
                <StarRating rating={product.rating || 0} starHeight={14} starWidth={14}/>

              </div>
              <TabContainer>
                <table className="tabs__table" id="characteristics">
                  <tbody>
                    <tr className="tabs__table-row">
                      <td className="tabs__title">Артикул:</td>
                      <td className="tabs__value">{product.vendorCode}</td>
                    </tr>
                    <tr className="tabs__table-row">
                      <td className="tabs__title">Тип:</td>
                      <td className="tabs__value">{GuitarType[product.type].typeName}</td>
                    </tr>
                    <tr className="tabs__table-row">
                      <td className="tabs__title">Количество струн:</td>
                      <td className="tabs__value">{product.stringCount}-струнная</td>
                    </tr>
                  </tbody>
                </table>
                <p className="tabs__product-description" id="description">
                  {product.description}
                </p>
              </TabContainer>

            </div>
            <div className="product-container__price-wrapper">
              <p className="product-container__price-info product-container__price-info--title">Цена:</p>
              <p className="product-container__price-info product-container__price-info--value">{product.price} ₽</p>
              <Link className="button button--red button--big product-container__button" to="#">Добавить в корзину</Link>
            </div>
          </div>

          <Reviews comments={comments[id]}/>
        </>}

    </MainLayout>
  );
}

export default ProductPage;

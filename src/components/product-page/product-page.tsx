import MainLayout from '../main-layout/main-layout';
import Breadcrumbs from '../common/breadcrumbs/breadcrumbs';
import Spinner from '../common/spinner/spinner';
import StarRating from '../common/star-rating/star-rating';
import Reviews from './reviews/reviews';
import TabContainer from './tab-container/tab-container';
import ProductCharacteristics from './product-characteristics/product-characteristics';
import ProductDescription from './product-description/product-description';
import { AppMessage, tabLabel } from '../../const';
import { useEffect} from 'react';
import { useBreadcrumbRoutes } from '../../hooks/use-breadcrumb-routes/use-breadcrumb-routes';
import { useParams, Link } from 'react-router-dom';
import { useGuitar } from '../../hooks/use-guitar/use-guitar';
import { useComments } from '../../hooks/use-comments/use-comments';

const scrollOption = {
  top: 0,
  left: 0,
  behavior: 'auto',
} as const;

type PageParams = {
  id: string,
}

function ProductPage(): JSX.Element {
  const params: PageParams = useParams();
  const id = Number(params.id);
  const {product, isErrorLoadingGuitars, isFetchingGuitars} = useGuitar(id);
  const comments = useComments([], id);

  useEffect(() => {
    window.scrollTo(scrollOption);
  }, []);

  const routes = useBreadcrumbRoutes(ProductPage);

  if (product) {
    routes[routes.length - 1].title = product.name;
  }

  if (isErrorLoadingGuitars) {
    return (
      <MainLayout>
        <Breadcrumbs routes={routes} />
        <p style={{display: 'flex', justifyContent: 'center'}}>
          {AppMessage.ErrorOnGetGuitars}
        </p>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {isFetchingGuitars || !product ? <Spinner marginTop={'5em'} /> :
        <>
          <h1 className="page-content__title title title--bigger">{product.name}</h1>
          <Breadcrumbs routes={routes} />

          <div className="product-container">
            <img className="product-container__img" src={product.previewImg} width="90" height="235" alt=""/>
            <div className="product-container__info-wrapper">
              <h2 className="product-container__title title title--big title--uppercase">{product.name}</h2>
              <div className="rate product-container__rating" aria-hidden="true">
                <span className="visually-hidden">Рейтинг:</span>
                <StarRating rating={product.rating || 0} starHeight={14} starWidth={14}/>

              </div>
              <TabContainer initialTab={tabLabel.characteristics.en}>
                <ProductCharacteristics product={product} label={tabLabel.characteristics.en}/>
                <ProductDescription product={product} label={tabLabel.description.en}/>
              </TabContainer>

            </div>
            <div className="product-container__price-wrapper">
              <p className="product-container__price-info product-container__price-info--title">Цена:</p>
              <p className="product-container__price-info product-container__price-info--value">{product.price} ₽</p>
              <Link className="button button--red button--big product-container__button" to="#">Добавить в корзину</Link>
            </div>
          </div>

          {comments[id] ? <Reviews comments={comments[id]}/> : <Spinner />}
        </>}

    </MainLayout>
  );
}

export default ProductPage;

import StarRating from '../../star-rating/star-rating';
import {Link} from 'react-router-dom';
import {Comment, Guitar, RemoteDataByID, RequestStatus} from '../../../../types/types';

type Props = {
  guitar: Guitar,
  comments: RemoteDataByID<Comment>,
}

const getCommentsCount = (id: number, comments: RemoteDataByID<Comment>) => {
  switch (true) {
    case (Boolean(comments[id]) && comments[id].requestStatus === RequestStatus.PENDING):
      return 'Загрузка...';
    case (Boolean(comments[id]) && comments[id].requestStatus === RequestStatus.SUCCESS):
      return comments[id].data.length;
    default:
      return null;
  }
};

function GuitarCard({guitar, comments}: Props): JSX.Element {
  const {id, name, price, rating, previewImg} = guitar;
  return (
    <div className="product-card" key={id} data-testid={'product-card'}>
      <img src={previewImg} width="75" height="190" alt={name}/>
      <div className="product-card__info">
        <div className="rate product-card__rate" aria-hidden="true">
          <span className="visually-hidden">Рейтинг:</span>
          <StarRating rating={rating} />

          <span className="rate__count" data-testid="guitar-rate-count">
            {getCommentsCount(guitar.id, comments)}
          </span>
          <span className="rate__message"/>
        </div>
        <p className="product-card__title" data-testid="guitar-name">{name}</p>
        <p className="product-card__price" data-testid="guitar-price">
          <span className="visually-hidden">Цена:</span>
          {`${price} ₽`}
        </p>
      </div>
      <div className="product-card__buttons">
        <Link className="button button--mini" to="#">Подробнее</Link>
        <Link className="button button--red button--mini button--add-to-cart" to="#">Купить</Link>
      </div>
    </div>
  );
}

export default GuitarCard;

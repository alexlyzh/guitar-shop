import { Link } from 'react-router-dom';
import { ModalOpenBtnProps } from '../modal-open-button';
import { AppPath } from '../../../../const/app-routes';

enum Label {
  buy = 'Купить',
  inCart = 'В Корзине',
}

enum ClassName {
  buy = 'button button--red button--mini button--add-to-cart',
  inCart = 'button button--red-border button--mini button--in-cart',
}

function CatalogCartBtn({isInCart, onLinkClick}: Omit<ModalOpenBtnProps, 'type'>): JSX.Element {
  return (
    <Link
      className={isInCart ? ClassName.inCart : ClassName.buy}
      to={isInCart ? AppPath.cart : '#'}
      aria-label="open cart modal"
      role="modal-open-button"
      onClick={onLinkClick}
    >
      {isInCart ? Label.inCart : Label.buy}
    </Link>
  );
}

export default CatalogCartBtn;

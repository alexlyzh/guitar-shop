import CartProduct from '../cart-product/cart-product';
import { CartItem } from '../../../../types/types';

type Props = {
  cartItems: CartItem[],
}

function CartProductList({cartItems}: Props): JSX.Element {
  if (!cartItems.length) {
    return <p className="cart__empty">Корзина пуста</p>;
  }

  return (
    <>
      {cartItems.map((product) => (
        <CartProduct cartItem={product} key={product.guitar.id} />
      ))}
    </>
  );
}

export default CartProductList;

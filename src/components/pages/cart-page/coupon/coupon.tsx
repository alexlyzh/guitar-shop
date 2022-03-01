import { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { submitCoupon } from '../../../../store/reducer/cart-reducer/cart-reducer';
import { Discount, RequestStatus } from '../../../../types/types';

const couponMessage = {
  [RequestStatus.PENDING]: 'Обработка...',
  [RequestStatus.SUCCESS]: 'Промокод принят',
  [RequestStatus.ERROR]: 'Промокод не принят',
} as const;

const couponClassName = {
  [RequestStatus.PENDING]: '',
  [RequestStatus.SUCCESS]: 'form-input__message--success',
  [RequestStatus.ERROR]: 'form-input__message--error',
} as const;

type Props = {
  discount: Discount,
}

function Coupon({ discount }: Props): JSX.Element {
  const dispatch = useDispatch();
  const [coupon, setCoupon] = useState<string>('');
  const changeCoupon = ({target}: ChangeEvent<HTMLInputElement>) => setCoupon(target.value.toLowerCase());
  const submitCartCoupon = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(submitCoupon(coupon));
  };

  return (
    <div className="cart__coupon coupon">
      <h2 className="title title--little coupon__title">Промокод на скидку</h2>
      <p className="coupon__info">Введите свой промокод, если он у вас есть.</p>
      <form className="coupon__form" id="coupon-form" method="post" action="/" onSubmit={submitCartCoupon}>
        <div className="form-input coupon__input">
          <label className="visually-hidden">Промокод</label>
          <input
            type="text"
            placeholder="Введите промокод"
            id="coupon"
            name="coupon"
            value={coupon}
            onChange={changeCoupon}
          />
          {discount.requestStatus !== RequestStatus.IDLE
            ? <p className={`form-input__message ${couponClassName[discount.requestStatus]}`}>{couponMessage[discount.requestStatus]}</p>
            : null}
        </div>
        <button className="button button--big coupon__button" type="submit">Применить</button>
      </form>
    </div>
  );
}

export default Coupon;

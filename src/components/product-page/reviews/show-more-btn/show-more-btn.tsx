import {forwardRef} from 'react';

type Props = {
  label: string,
  onBtnClick: () => void;
}

const ShowMoreBtn = forwardRef<HTMLButtonElement, Props>(({label, onBtnClick}, ref) => (
  <button
    ref={ref}
    className="button button--medium reviews__more-button"
    onClick={onBtnClick}
  >
    {label}
  </button>));

ShowMoreBtn.displayName = 'ShowMoreBtn';

export default ShowMoreBtn;

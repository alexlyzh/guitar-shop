import { Link } from 'react-router-dom';

type Props = {
  isActive: boolean,
  label: string,
  onLinkClick: () => void;
}

function TabLink({isActive, label, onLinkClick}: Props): JSX.Element {
  return (
    <Link
      className={`button button--medium tabs__button ${isActive ? '' : 'button--black-border'}`}
      to="#"
      onClick={onLinkClick}
    >
      {label}
    </Link>
  );
}

export default TabLink;

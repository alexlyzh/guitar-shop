import {Link} from 'react-router-dom';

type Props = {
  isActive: boolean,
  ruName: string,
  enName: string,
  onLinkClick: () => void;
}

function TabLink({isActive, ruName, enName, onLinkClick}: Props): JSX.Element {
  return (
    <Link
      className={`button button--medium tabs__button ${isActive ? '' : 'button--black-border'}`}
      to={`#${enName}`}
      onClick={onLinkClick}
    >
      {ruName}
    </Link>
  );
}

export default TabLink;

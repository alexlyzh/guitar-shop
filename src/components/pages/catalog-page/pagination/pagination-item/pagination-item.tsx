import {Link} from 'react-router-dom';

type Props = {
  linkText: string | number,
  onLinkClick: () => void,
  isPage?: boolean,
  isActive?: boolean,
  className?: string,
}

function PaginationItem({className, linkText, isActive, isPage, onLinkClick}: Props): JSX.Element {
  const testId = isActive ? 'pagination-item-active' : 'pagination-item';
  return (
    <li className={className} data-testid={isPage ? testId : 'pagination-direction'}>
      <Link className="link pagination__page-link" to="#" onClick={onLinkClick}>
        {linkText}
      </Link>
    </li>);
}

export default PaginationItem;

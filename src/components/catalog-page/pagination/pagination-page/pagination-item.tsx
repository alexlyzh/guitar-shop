import {Link} from 'react-router-dom';

type Props = {
  linkText: string | number,
  onLinkClick: () => void,
  isActive?: boolean,
  className?: string,
}

function PaginationItem({className, linkText, isActive, onLinkClick}: Props): JSX.Element {
  return (
    <li className={className} data-testid={isActive ? 'pagination-page-active' : 'pagination-page'}>
      <Link className="link pagination__page-link" to="#" onClick={onLinkClick}>
        {linkText}
      </Link>
    </li>);
}

export default PaginationItem;

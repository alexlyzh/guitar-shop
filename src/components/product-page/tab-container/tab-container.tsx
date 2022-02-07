import TabLink from './tab-link/tab-link';
import { Children, isValidElement, ReactNode, useState } from 'react';

type Props = {
  children: ReactNode,
  initialTab: string,
}

function TabContainer({children, initialTab}: Props): JSX.Element {
  const [activeTab, setActiveTab] = useState(initialTab);

  return (
    <div className="tabs">
      {Children.map(children, (child) => {
        if (!isValidElement(child)) {
          return;
        }
        const label = (child.props.label);
        return (
          <TabLink
            isActive={activeTab === label}
            label={label}
            onLinkClick={() => setActiveTab(label)}
          />);
      })}

      <div className="tabs__content" aria-label="tabs-content">
        {Children.map(children, (child) => {
          if (!isValidElement(child)) {
            return;
          }
          if (child.props.label === activeTab) {
            return child;
          }
        })}
      </div>
    </div>
  );
}

export default TabContainer;

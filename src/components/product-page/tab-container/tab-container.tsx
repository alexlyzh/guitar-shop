import TabLink from './tab-link/tab-link';
import { Children, isValidElement, ReactNode, useState } from 'react';
import { tabLabel } from '../../../const';

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
        const label = (child.props.label) as keyof typeof tabLabel;
        return (
          <TabLink
            isActive={activeTab === tabLabel[label].en}
            label={tabLabel[label].ru}
            onLinkClick={() => setActiveTab(tabLabel[label].en)}
          />);
      })}

      <div className="tabs__content">
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

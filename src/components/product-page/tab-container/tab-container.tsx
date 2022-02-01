import { useState, Children, ReactNode, isValidElement } from 'react';
import { useLocation } from 'react-router-dom';
import TabLink from './tab-link/tab-link';

const TabName = {
  characteristics: {
    en: 'characteristics',
    ru: 'Характеристики',
  },
  description: {
    en: 'description',
    ru: 'Описание',
  },
} as const;

type Props = {
  children: ReactNode,
}

function TabContainer({children}: Props): JSX.Element {
  const location = useLocation();
  const hash = location.hash.slice(1);
  const [activeTab, setActiveTab] = useState(hash in TabName ? hash : TabName.characteristics.en);

  return (
    <div className="tabs">
      {Children.map(children, (child) => {
        if (!isValidElement(child)) {
          return;
        }
        const id = (child.props.id) as keyof typeof TabName;
        return (
          <TabLink
            isActive={activeTab === TabName[id].en}
            ruName={TabName[id].ru}
            enName={TabName[id].en}
            onLinkClick={() => setActiveTab(TabName[id].en)}
          />);
      })}

      <div className="tabs__content">
        {Children.map(children, (child) => {
          if (!isValidElement(child)) {
            return;
          }
          if (child.props.id === activeTab) {
            return child;
          }
        })}
      </div>
    </div>
  );
}

export default TabContainer;

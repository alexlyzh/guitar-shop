import TabContainer from './tab-container';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';

const history = createMemoryHistory();

type TabChildProps = {
  label: string,
}

function TabChild({label}: TabChildProps): JSX.Element {
  return <span role="tab" aria-label={label}>{label}</span>;
}

describe('Component: TabContainer', () => {
  it('should render and change tabs correctly', () => {

    render(
      <Router history={history} >
        <TabContainer initialTab={'one'}>
          <TabChild label="one" />
          <TabChild label="two" />
          <TabChild label="three" />
        </TabContainer>
      </Router>,
    );

    expect(screen.getAllByRole('link')).toHaveLength(3);
    expect(screen.getAllByRole('tab')).toHaveLength(1);
    expect(screen.getByRole('tab', {name: 'one'})).toBeInTheDocument();
    userEvent.click(screen.getByRole('link', {name: 'two'}));
    expect(screen.getByRole('tab', {name: 'two'})).toBeInTheDocument();
  });
});

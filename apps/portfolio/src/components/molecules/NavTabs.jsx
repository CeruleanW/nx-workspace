import { Tab, Tabs } from '@material-ui/core/';
import { Link } from 'react-router-dom';

//TODO
// - add icons
const labels = ['Home', 'Projects', 'About me', 'Contact', 'Resume'];

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};

export default function NavTabs(props) {
  const allTabs = props.routes; //["/", "/projects", "/aboutme", "/contact"];

  const renderTabs = allTabs.map((route, index) => (
    <Tab
      label={labels[index]}
      value={route}
      component={Link}
      to={route}
      key={route}
      {...a11yProps(index)}
    />
  ));

  return (
    <Tabs
      value={props.value}
      centered
      aria-label='navigation tabs'
    >
      {renderTabs}
    </Tabs>
  );
}

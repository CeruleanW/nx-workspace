import MuiTabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export function Tabs({onChange, ...optionals}) {


  return (
    <div>
      <MuiTabs aria-label="basic tabs example" variant="fullWidth" textColor="secondary"
        indicatorColor="secondary" onChange={onChange}>
        <Tab label="Box" />
        <Tab label="Card" />
        <Tab label="Board" />
      </MuiTabs>
    </div>
  );
}

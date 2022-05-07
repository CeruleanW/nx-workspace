import { useMainPageData } from '../../hooks';
import { ErrorMsg } from '@root/shared/components/atomics/ErrorMsg';
import PageTemplate from '@root/shared/components/template/PageTemplate';
import { CenteredLoading } from '@root/shared/components/atomics/Loading';
import { processMainData } from './processors';
import { BoxCard } from '../../components/molecule/BoxCard';
import { Tabs } from '../../components/organism/Tabs';
import { signOut } from 'next-auth/client';
import { Button } from '@root/shared/components/atomics';
import { useState } from 'react';
import { TabPanel } from '../../components/organism/TabPanel';
import { Editor } from '../../components/organism/Editor';
import { Board } from '../../components/organism/Board';
import {Nav} from '@root/shared/components/organism/Nav';

export default function Main() {
  // should show all the boxes of current user

  // Hook
  const { data, error } = useMainPageData();

  // State
  const [tab, setTab] = useState(0);

  if (error) {
    return <ErrorMsg text={error?.message} />;
  }

  if (!data) {
    return <CenteredLoading />;
  }

  console.debug('Main data', data);
  const processed = processMainData(data);
  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <PageTemplate>
      <Nav title={'Idea Dropper'} ></Nav>
      <div className={'flex space-x-4 mx-4 flex-grow'} >
        <TabPanel value={tab} index={0}>
          {processed?.map(item => <BoxCard key={`${item?._id}`} name={item?.name} data={item} className={'max-h-36 min-w-max'} />)}
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <Editor />
        </TabPanel>
        <TabPanel value={tab} index={2}>
          <Board />
        </TabPanel>
      </div>
      <div className='nav-container'>
        <Button onClick={signOut}>Logout</Button>
      </div>
      <Tabs onChange={handleChange} value={tab} />
    </PageTemplate>
  )
}

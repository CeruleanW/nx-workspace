// https://github.com/diegohaz/arc/wiki/Atomic-Design
import PageTemplate from '../../template/PageTemplate';
import { Nav } from '../../organism/Nav';
import {Loading} from '@root/shared/components/atomic/Loading';

function HomePage(props) {

  // return <Loading />
  return (
    <PageTemplate header={<Nav />}>
      <div className={'flex justify-center'}>
        <h2 className={'text-2xl'}>Heading</h2>
      </div>
      <div className={'flex p-10'}>text body</div>
    </PageTemplate>
  );
}

export default HomePage;

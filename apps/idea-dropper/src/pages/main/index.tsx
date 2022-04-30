import { useMainPageData } from '../../hooks';
import { ErrorMsg } from '@root/shared/components/atomics/ErrorMsg';
import { processMainData } from './processors';
import {BoxCard} from '../../components/molecule/BoxCard';

export default function Main() {
  // should show all the boxes of current user

  const { data, error } = useMainPageData();

  if (error) {
    return <ErrorMsg text={error?.message} />;
  }
  console.debug('data', data);
  const processed = processMainData(data);


  return (
    <div>
      {processed?.map(item => <BoxCard name={item?.name} key={item?.id} />)}
    </div>
  )
}

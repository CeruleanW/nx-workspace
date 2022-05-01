import { useMainPageData } from '../../hooks';
import { ErrorMsg } from '@root/shared/components/atomics/ErrorMsg';
import PageTemplate from '@root/shared/components/template/PageTemplate';
import { CenteredLoading } from '@root/shared/components/atomics/Loading';
import { processMainData } from './processors';
import { BoxCard } from '../../components/molecule/BoxCard';

export default function Main() {
  // should show all the boxes of current user

  const { data, error } = useMainPageData();

  if (error) {
    return <ErrorMsg text={error?.message} />;
  }

  if (!data) {
    return <CenteredLoading />;
  }

  console.debug('data', data);
  const processed = processMainData(data);


  return (
    <PageTemplate>
      <div className={'flex space-x-4 mx-4'} >
        {processed?.map(item => <BoxCard key={`${item?._id}`} name={item?.name} data={item} />)}
      </div>
    </PageTemplate>
  )
}

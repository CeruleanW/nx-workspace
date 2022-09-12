import {Card} from '@root/shared/components/atomics/Card';
import {Icon} from '@root/shared/components/atomics/Icon';
import {Typography} from '@root/shared/components/atomics/Typography';

export function BoxCard({ name, data, ...optionals }) {
  const {shared_with, tags} = data || {};
  const isShared = shared_with && shared_with.length > 0;

  const handleClick = () => {
    console.debug('BoxCard clicked', data);
    
  }

  return (
    <Card {...optionals} onClick={handleClick}>
      <Typography className='text-lg font-semibold' >{name}</Typography>
      {isShared ? <Icon name={'fa-solid fa-users'} /> : null}
    </Card>
  );
}

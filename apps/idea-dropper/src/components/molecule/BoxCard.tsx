import {Card} from '@root/shared/components/atomics/Card';
import {Icon} from '@root/shared/components/atomics/Icon';

export function BoxCard({ name, data, ...optionals }) {
  const {shared_with, tags} = data || {};
  const isShared = shared_with && shared_with.length > 0;

  return (
    <Card {...optionals}>
      <p>{name}</p>
      <Icon name={'fa-solid fa-users'} />
    </Card>
  );
}

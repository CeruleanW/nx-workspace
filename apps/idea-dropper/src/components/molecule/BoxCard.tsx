import { Card } from '@root/shared/components/atomics/Card';
import { Icon } from '@root/shared/components/atomics/Icon';
import { Typography } from '@root/shared/components/atomics/Typography';
import { isFilledArray } from '@root/shared/utils';
import { Menu, MenuItem, ControlledMenu } from '@root/shared/components';
import { useRef, useState } from 'react';
import { useClickAway } from 'react-use';
import styled from 'styled-components';
import { BoxResponseDTO } from '../../features/idea-server';

const StyledCard = styled(Card)`
  min-height: 8rem;
  min-width: 8rem;
`;



/**
 * Interact with a Box
 */
export function BoxCard({ name, data, onMenuClicks, ...optionals }) {
  const { ...rest } = optionals;
  const { onDraw, onShake, onAdd, onImport, onShare } = onMenuClicks || {};

  const { _id, shared_with, tags, cards, draw_pointer, draw_sequence } = data as BoxResponseDTO || {};
  // const nextCardID = getNextDrawCardID(draw_sequence, draw_pointer, cards);
  const isShared = isFilledArray(shared_with);

  // Local state & ref
  const [isOpen, setOpen] = useState(false);
  const cardActionRef = useRef(null);
  // const containerRef = useRef(null);


  const handleClick = () => {
    console.debug('BoxCard clicked', data);
    setOpen(!isOpen);
  }

  const handleMenuClick = (e) => {
    console.debug('Menu clicked', e);
  };

  useClickAway(cardActionRef, (e) => {
    // console.debug('OUTSIDE CLICKED', e);
    setOpen(false);
  });

  return (
    <>
      <div ref={cardActionRef} data-cy={'box-card-container'}>
        <StyledCard onClick={handleClick} data-cy={'box-card'} className={'flex flex-col justify-between p-4'}>
          <Typography className='text-lg font-semibold' >{name}</Typography>
          <div className='flex justify-end' >{isShared ? <Icon name={'fa-solid fa-users'} /> : null}</div>
        </StyledCard>
        <ControlledMenu
          state={isOpen ? 'open' : 'closed'}
          anchorRef={cardActionRef}
        >
          <MenuItem onClick={() => onDraw && onDraw(_id)}>Draw</MenuItem>
          <MenuItem onClick={() => onShake && onShake(_id)}>Shake</MenuItem>
          <MenuItem onClick={() => onAdd && onAdd(_id)}>Add</MenuItem>
          <MenuItem onClick={handleMenuClick}>Import</MenuItem>
          <MenuItem onClick={handleMenuClick}>Share</MenuItem>
        </ControlledMenu>
      </div>
    </>
  );
}

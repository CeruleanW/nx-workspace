import { IconButton } from '@root/shared/components/atomics/IconButton';
import { Icon } from '@root/shared/components/atomics/Icon';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import {
  Menu,
  MenuItem,
  MenuButton,
} from '@root/shared/components/molecule/Menu';
import { useRef, useState } from 'react';
import {deleteCard} from '../../features/idea-server';

export function EditCardMenu({data, ...optionals}) {
  // Local states
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    console.log('delete');
    const {_id} = data || {};
    deleteCard(_id);
  };

  return (
    <div>
      <div ref={anchorRef}>
        <IconButton
          onClick={() => setOpen(!open)}
        >
          <Icon name={faEllipsisH} />
        </IconButton>
      </div>
      <Menu
        anchorEl={anchorRef.current}
        open={open}
        onClose={() => setOpen(!open)}
      >
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
        {/* <MenuItem>Close Window</MenuItem> */}
      </Menu>
    </div>
  );
}

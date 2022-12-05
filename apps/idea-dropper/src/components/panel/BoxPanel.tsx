import { processMainData } from '../../lib/main/processors';
import { BoxCard } from '../molecule/BoxCard';
import IconButton from '@mui/material/IconButton';
import { useAsyncFn } from 'react-use';
import { addBox, CreateBoxDTO } from '../../features/idea-server';
import { useUser } from '../../hooks';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { Icon } from '@root/shared/components';
import { TextField, Button } from '@root/shared/components';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';

/**
 *
 */
export function BoxPanel({ data, ...optionals }) {
  // Props
  const processed = processMainData(data);

  // Hooks
  // const [saveState, executeSave] = useAsyncFn((d) => addBox(d));
  const { data: userData, error: userError } = useUser();
  const { handleSubmit, control } = useForm();

  // Local state
  const [isDialogOpened, setIsDialogOpened] = useState(false);

  if (userError) {
    return null;
  }

  if (!userData) {
    return null;
  }

  // Handlers
  const handleAddBoxClick = () => {
    setIsDialogOpened(true);
  };

  const handleAddBoxSubmit = (data) => {
    console.debug('form data', data);
    const { name } = data || {};

    const input: CreateBoxDTO = { name, owner: userData._id };
    console.debug('submit data', input);
    addBox(input).then(() => toast.success(`Add box ${name}`)).catch(() => toast.error(`Failed to add a box`));
  }

  const menuClickHandlers = {};

  return (
    <>
      <div className="max-h-36">
        <IconButton
          aria-label="add a box"
          color="primary"
          onClick={handleAddBoxClick}
        >
          <Icon name="solid-circle-plus" size={48} />
        </IconButton>
      </div>
      <div data-cy={'box-card-list'} className='flex gap-x-8 items-start'>
        {processed?.map((item) => (
          <BoxCard
            key={`${item?._id}`}
            name={item?.name}
            data={item}
            className={'max-h-36 min-w-max w-32'}
            onMenuClicks={menuClickHandlers}
          />
        ))}
      </div>
      <Dialog open={isDialogOpened} onClose={() => setIsDialogOpened(false)}>
        <DialogTitle>Create a box</DialogTitle>
        <div className='p-4' >
          <div className='my-2' >
            <Controller
              name="name"
              control={control}
              render={({ field }) => <TextField placeholder="Box name" {...field} />}
            />
          </div>
          <div className='flex gap-x-2'>
            <Button onClick={handleSubmit(handleAddBoxSubmit)} >Save</Button>
            <Button variant='secondary' onClick={() => setIsDialogOpened(false)}>Cancel</Button>
          </div>
        </div>
      </Dialog>
    </>
  );
}

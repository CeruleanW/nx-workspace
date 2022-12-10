import { processMainData } from '../../lib/main/processors';
import { BoxCard } from '../molecule/BoxCard';
import IconButton from '@mui/material/IconButton';
import { useAsyncFn } from 'react-use';
import { addBox, CreateBoxDTO, drawCard } from '../../features/idea-server';
import { useUser } from '../../hooks';
import Dialog from '@mui/material/Dialog';
import { useState } from 'react';
import { Icon } from '@root/shared/components';
import { toast } from 'react-toastify';
import { useSWRConfig } from 'swr';
import { AddBoxDialog } from '../organism/AddBoxDialog';

/**
 *
 */
export function BoxPanel({ data, ...optionals }) {
  // Props
  const processed = processMainData(data);

  // Hooks
  // const [saveState, executeSave] = useAsyncFn((d) => addBox(d));
  const { data: userData, error: userError } = useUser();
  const { mutate } = useSWRConfig();

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

  /**
   * Draw a card from given box
   */
  const handleDraw = async (boxID: string) => {
    console.debug('Draw a card from box', boxID);
    // send a request to draw a card from this box
    const card = await drawCard(boxID);
    console.debug('card', card);
    // open a modal for showing the card
  };

  const handleShake = () => {

  };

  const menuClickHandlers = {
    onDraw: handleDraw,
    onShake: handleShake,
  };

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
        <AddBoxDialog onHide={() => setIsDialogOpened(false)} onConfirm={() => setIsDialogOpened(false)} data={userData} />
        {/* <DialogTitle>Create a box</DialogTitle>
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
        </div> */}
      </Dialog>
    </>
  );
}

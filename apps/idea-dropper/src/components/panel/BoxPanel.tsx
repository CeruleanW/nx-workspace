import { processMainData } from '../../lib/main/processors';
import { BoxCard } from '../molecule/BoxCard';
import IconButton from '@mui/material/IconButton';
import { addBox, ALL_BOX, CreateBoxDTO, drawCard, shakeBox } from '../../features/idea-server';
import { useUser, useModal } from '../../hooks';
import { useState } from 'react';
import { Icon } from '@root/shared/components';
import { useSWRConfig } from 'swr';
import { ModalGroup } from '../organism/Modal';
import { toast } from 'react-toastify';

/**
 * display a list of boxes
 */
export function BoxPanel({ data, ...optionals }) {
  // Props
  const processed = processMainData(data);

  // Hooks
  const { data: userData, error: userError } = useUser();
  const { mutate } = useSWRConfig();
  // const isDialogOpened = useModal((state) => state.isDialogOpened);
  // const operation = useModal((state) => state.operation);
  const setOperation = useModal((state) => state.setOperation);
  const openDialog = useModal((state) => state.openDialog);
  // const closeDialog = useModal((state) => state.closeDialog);
  const setBoxID = useModal((state) => state.setBoxID);
  const setModalData = useModal((state) => state.setData);

  // Local state
  // const [isDialogOpened, setIsDialogOpened] = useState(false);
  const [selectedBox, setSelectedBox] = useState({ operation: null, id: null });

  if (userError) {
    return null;
  }

  if (!userData) {
    return null;
  }

  // Handlers
  const handleAddBoxClick = () => {
    // setIsDialogOpened(true);
    openDialog();
    setOperation('add');
    setBoxID(null);
    // setSelectedBox({id: null, operation: 'add'});
  };

  /**
   * Draw a card from given box
   */
  const handleDraw = async (boxID: string) => {
    console.debug('Draw a card from box', boxID);
    try {
      // send a request to draw a card from this box
      const card = await drawCard(boxID);
      console.debug('card', card);
      // open a modal for showing the card
      setOperation('editCard');
      setModalData(card);
      openDialog();
    } catch (error) {
      console.error(error);
      toast.error(`Failed to draw a card. ${error?.message}`);
    }

  };

  const handleShake = async (boxID: string) => {
    console.debug('Shake the box');
    await shakeBox(boxID);
    mutate(ALL_BOX);
  };

  const handleDelete = (data) => {
    setOperation('delete');
    setModalData(data);
    openDialog();
  };

  const menuClickHandlers = {
    onDraw: handleDraw,
    onShake: handleShake,
    onDelete: handleDelete,
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
      <div data-cy={'box-card-list'} className="flex gap-x-8 items-start">
        {processed?.map((item) => (
          <BoxCard
            key={`box-card-item-${item?._id}`}
            name={item?.name}
            data={item}
            className={'max-h-36 min-w-max w-32'}
            onMenuClicks={menuClickHandlers}
          />
        ))}
      </div>
      <ModalGroup />
    </>
  );
}

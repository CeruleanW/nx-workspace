// import DialogTitle from '@mui/material/DialogTitle';
// import { Button, TextField, Typography } from '@root/shared/components';
// import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useSWRConfig } from 'swr';
import {
  ALL_BOX,
  CreateBoxDTO,
  UpdateCardDTO,
  updateCard,
} from '../../features/idea-server';
import { EditorContent } from './Editor';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton } from '@root/shared/components/atomics/IconButton';
import { Icon } from '@root/shared/components/atomics/Icon';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { Menu, MenuItem, MenuButton } from '@root/shared/components/molecule/Menu';
import { EditCardMenu } from './EditCardMenu';

/**
 * UI Modal for editing cards
 */
export function EditCardDialog({ onConfirm, onHide, data, ...optionals }) {
  // Hooks
  // const { handleSubmit, control } = useForm();
  const { mutate } = useSWRConfig();
  const { userID, ...restData } = data || {};

  const handleConfirm = async (data) => {
    const { cardData } = data || {};
    const { _id } = restData;
    const { title, content, boxes } = cardData;

    const updateData: UpdateCardDTO = {
      _id,
      title,
      content,
      boxes,
    };
    console.debug('update data', updateData);
    const { data: updatedCard } = await updateCard(updateData);
    mutate(ALL_BOX);
    onConfirm();
  };

  return (
    <>
      <DialogTitle className="flex justify-between">
        <span>Edit Card</span>
        <EditCardMenu data={data}/>
      </DialogTitle>
      <div className="p-4 w-full">
        <EditorContent
          userID={userID}
          onSubmit={handleConfirm}
          defaultValues={restData}
        />
      </div>
    </>
  );
}

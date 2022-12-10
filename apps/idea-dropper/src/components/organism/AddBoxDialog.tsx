import { processMainData } from '../../lib/main/processors';
import { BoxCard } from '../molecule/BoxCard';
import IconButton from '@mui/material/IconButton';
import { useAsyncFn } from 'react-use';
import { addBox, CreateBoxDTO, drawCard } from '../../features/idea-server';
import { useUser } from '../../hooks';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { Icon } from '@root/shared/components';
import { TextField, Button } from '@root/shared/components';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useSWRConfig } from 'swr';
import { ALL_BOX } from '../../features/idea-server';


/**
 *
 */
export function AddBoxDialog({ onConfirm, onHide, data, ...optionals }) {
  // Hooks
  const { handleSubmit, control } = useForm();
  const { mutate } = useSWRConfig();

  const handleAddBoxSubmit = (formValues) => {
    console.debug('form data', formValues);
    const { name } = formValues || {};
    const { _id } = data || {};
    const input: CreateBoxDTO = { name, owner: _id };
    console.debug('submit data', input);
    addBox(input)
      .then(() => toast.success(`Add box ${name}`))
      .catch(() => toast.error(`Failed to add a box`))
      .finally(() => {
        mutate(ALL_BOX);
        onConfirm();
      });
  };

  return (
    <>
      <DialogTitle>Create a box</DialogTitle>
      <div className="p-4">
        <div className="my-2">
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField placeholder="Box name" {...field} />
            )}
          />
        </div>
        <div className="flex gap-x-2">
          <Button onClick={handleSubmit(handleAddBoxSubmit)}>Save</Button>
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
        </div>
      </div>
    </>
  );
}

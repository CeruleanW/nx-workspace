import React, { useState } from 'react';
import { RichTextEditor } from './components/RichEditor';
import { Paper } from '@root/shared/components/atomics/Paper';
import { Button } from '@root/shared/components/atomics/Button';
import { Select } from '@root/shared/components/atomics/Select';
import { ErrorBoundary } from '@root/shared/features/error-handling';
import { CardTitle } from '../../molecule/CardTitle';
import { insertCard } from '@idea/features/idea-server';
import { useAsyncFn } from 'react-use';
import { DEFAULT_INIT_VALUE } from './constants';
import { useContentInLocalStorage, useEditor } from './hooks';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

type Box = {
  _id: string;
  name: string;
  [x: string]: any;
};

type OptionalsProps = {
  tags: Box[];
  [x: string]: any
}

export function Editor({ ...optionals }: Partial<OptionalsProps>) {
  const { tags = [], ...rest } = optionals;
  // Hooks
  const [saveState, executeSave] = useAsyncFn((data) => insertCard(data));
  const [value, setValue, remove] = useContentInLocalStorage();
  const [titleValue, setTitleValue] = useState('');
  const editor = useEditor();
  const { handleSubmit } = useForm(
    {
      defaultValues: {
        
      }
    }
  );

  // Props
  const boxOptions = tags.map(tag => { return { value: tag._id, label: tag.name } })

  const handleSave = (data) => {
    const content = value;
    const title = titleValue;
    const cardData = { content, title };
    console.debug('submit data', cardData);
    executeSave({ cardData }).then(() => {
      toast.success(`Added card ${title}`)
    }).catch((error) => {
      console.error(error);
      toast.error(`Failed to add card ${title}`);
    });
    handleDiscard();
  };

  const handleDiscard = () => {
    remove();
    setTitleValue('');
    editor.children = DEFAULT_INIT_VALUE;
  }

  return (
    <div className='mx-auto w-10/12 flex flex-col'>
      <ErrorBoundary>
        <CardTitle value={titleValue} onChange={(e) => setTitleValue(e.target.value)} />
        <div className='flex w-full mb-4 item-center'>
          <label className='mr-2 flex items-center font-semibold'>Box:</label>
          <div className=' flex-1'><Select options={boxOptions} isMulti={true} /></div>
        </div>
        <Paper className='w-full flex-grow'>
          <RichTextEditor value={value} editor={editor} localStorageCallbacks={{ setValue, remove }} />
        </Paper>
        <div className='flex gap-x-4 mt-4' >
          <Button onClick={handleSubmit(handleSave)} >Save</Button>
          <Button onClick={handleDiscard} variant='outlined' >Reset</Button>
        </div>
      </ErrorBoundary>
    </div>
  );
}

import React, { useState } from 'react';
import { RichTextEditor } from './components/RichEditor';
import { Paper } from '@root/shared/components/atomics/Paper';
import { Button } from '@root/shared/components/atomics/Button';
import { Select } from '@root/shared/components/atomics/Select';
import { ErrorBoundary } from '@root/shared/features/error-handling';
import { CardTitle } from '../../molecule/CardTitle';
import { insertCard } from '@idea/features/idea-server';
import { useAsyncFn } from 'react-use';
import { DEFAULT_CONTENT_VALUE } from './constants';
import { useContentInLocalStorage, useEditor } from './hooks';
import { toast } from 'react-toastify';
import { useForm, Controller } from 'react-hook-form';
import { CenteredLoader } from '@root/shared/components/atomics/Loading';
import { BoxSelector } from '../../molecule/BoxSelector';
import { CardResponseDTO, UpdateCardDTO } from '../../../features/idea-server';

type Box = {
  _id: string;
  name: string;
  [x: string]: any;
};

type OptionalsProps = {
  tags: Box[];
  title: string;
  [x: string]: any;
};

/**
 * decouple from local storage
 */
export function EditorContent({
  userID,
  onSubmit,
  ...optionals
}: { userID: string } & Partial<OptionalsProps>) {
  const {
    defaultValues = { title: '', content: DEFAULT_CONTENT_VALUE, boxes: [] },
    tags = [],
    ...rest
  } = optionals;
  // Hooks
  const [saveState, executeSave] = useAsyncFn((data) => onSubmit(data));
  const editor = useEditor();
  const { handleSubmit, setValue, reset, control } = useForm({
    defaultValues,
  });

  const handleSave = (data) => {
    console.debug('submit data', data);
    // inputs
    const content = data.content;
    const title = data.title;
    const owner = userID;
    const boxes = data.boxes;

    const cardData = { content, title, owner, boxes };

    executeSave({ cardData })
      .then(() => {
        toast.success(`Updated card ${title}`);
        // mutate();
      })
      .catch((error) => {
        console.error(error);
        toast.error(`Failed to add card ${title}`);
      });
    handleDiscard();
  };

  const handleDiscard = () => {
    reset();
    editor.children = DEFAULT_CONTENT_VALUE;
  };

  const handleSelectBoxChange = (options) => {
    const boxesValue = options.map((opt) => opt.value);
    console.debug('boxesValue', boxesValue);
    setValue('boxes', boxesValue);
  };

  if (saveState.loading) {
    return <CenteredLoader />;
  }

  return (
    <div className="mx-auto w-10/12 flex flex-col">
      <ErrorBoundary>
        <Controller
          name="title"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <CardTitle
              value={value}
              onChange={(e) => onChange(e.target.value)}
            />
          )}
        />
        <Controller name="boxes" control={control} render={({ field: { onChange, onBlur, value } }) => (
          <BoxSelector boxes={tags} onChange={handleSelectBoxChange} value={value} />
        )} />
        {/* <BoxSelector boxes={tags} onChange={handleSelectBoxChange} /> */}
        <Paper className="w-full flex-grow">
          <Controller
            name="content"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <RichTextEditor
                value={value}
                editor={editor}
                callbacks={{
                  setValue: (value) => {
                    console.debug('changed content value', value);
                    onChange(value);
                  },
                  remove: () => reset(),
                }}
              />
            )}
          />
        </Paper>
        <div className="flex gap-x-4 mt-4">
          <Button type="submit" onClick={handleSubmit(handleSave)}>
            Save
          </Button>
          <Button onClick={handleDiscard} variant="outlined">
            Reset
          </Button>
        </div>
      </ErrorBoundary>
    </div>
  );
}

/**
 * Editor for editing a card
 */
export function Editor({
  userID,
  ...optionals
}: { userID: string } & Partial<OptionalsProps>) {
  const { tags = [], title = '', ...rest } = optionals;
  // Hooks
  const [saveState, executeSave] = useAsyncFn((data) => insertCard(data));
  const editor = useEditor();
  const { handleSubmit, setValue } = useForm({
    defaultValues: {
      boxes: tags,
      title,
    },
  });

  // Local values
  const [contentValue, setContentValue, removeContent] =
    useContentInLocalStorage();
  const [titleValue, setTitleValue] = useState('');

  // Props
  const boxOptions = tags.map((tag) => {
    return { value: tag._id, label: tag.name };
  });

  const handleSave = (data) => {
    console.debug('submit data', data);
    // inputs
    const content = contentValue;
    const title = titleValue;
    const owner = userID;
    const boxes = data.boxes;

    const cardData = { content, title, owner, boxes };

    executeSave({ cardData })
      .then(() => {
        toast.success(`Added card ${title}`);
      })
      .catch((error) => {
        console.error(error);
        toast.error(`Failed to add card ${title}`);
      });
    handleDiscard();
  };

  const handleDiscard = () => {
    removeContent();
    setTitleValue('');
    editor.children = DEFAULT_CONTENT_VALUE;
  };

  const handleSelectBoxChange = (options) => {
    const boxesValue = options.map((opt) => opt.value);
    console.debug('boxesValue', boxesValue);
    setValue('boxes', boxesValue);
  };

  if (saveState.loading) {
    return <CenteredLoader />;
  }

  return (
    <div className="mx-auto w-10/12 flex flex-col">
      <ErrorBoundary>
        <CardTitle
          value={titleValue}
          onChange={(e) => setTitleValue(e.target.value)}
        />
        <BoxSelector boxes={tags} onChange={handleSelectBoxChange} />
        <Paper className="w-full flex-grow">
          <RichTextEditor
            value={contentValue}
            editor={editor}
            callbacks={{ setValue: setContentValue, remove: removeContent }}
          />
        </Paper>
        <div className="flex gap-x-4 mt-4">
          <Button type="submit" onClick={handleSubmit(handleSave)}>
            Save
          </Button>
          <Button onClick={handleDiscard} variant="outlined">
            Reset
          </Button>
        </div>
      </ErrorBoundary>
    </div>
  );
}

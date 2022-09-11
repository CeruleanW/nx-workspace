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
  [x: string]: any;
};



export function EditorContent() {

}

export function TestFunction() {
  const { handleSubmit, setValue, getValues, register } = useForm({
    defaultValues: {
      boxes: [],
      test: 0
    },
  });

  //   const { register, handleSubmit } = useForm();
  const onSubmit = data => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input name="firstName" ref={register} />
      <select name="gender" ref={register}>
        <option value="female">female</option>
        <option value="male">male</option>
        <option value="other">other</option>
      </select>
      <input type="submit" />
    </form>
  );
}

/**
 *
 */
export function Editor({ userID, ...optionals }: Partial<OptionalsProps>) {
  const { tags = [], ...rest } = optionals;
  // Hooks
  const [saveState, executeSave] = useAsyncFn((data) => insertCard(data));
  const [contentValue, setContentValue, removeContent] = useContentInLocalStorage();
  const [titleValue, setTitleValue] = useState('');
  const editor = useEditor();
  const { handleSubmit, setValue } = useForm({
    defaultValues: {
      boxes: [],
      title: '',
    },
  });

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
    editor.children = DEFAULT_INIT_VALUE;
  };

  const handleSelectBoxChange = (options) => {
    const boxesValue = options.map(opt => opt.value);
    console.debug('boxesValue', boxesValue);
    setValue('boxes', boxesValue);
  };

  return (
    <div className="mx-auto w-10/12 flex flex-col">
      <ErrorBoundary>
        <CardTitle
          value={titleValue}
          onChange={(e) => setTitleValue(e.target.value)}
        />
        <div className="flex w-full mb-4 item-center">
          <label className="mr-2 flex items-center font-semibold">Box:</label>
          <div className=" flex-1">
            <Select options={boxOptions} isMulti={true} onChange={handleSelectBoxChange} />
          </div>
        </div>
        <Paper className="w-full flex-grow">
          <RichTextEditor
            value={contentValue}
            editor={editor}
            localStorageCallbacks={{ setValue: setContentValue, remove: removeContent }}
          />
        </Paper>
        <div className="flex gap-x-4 mt-4">
          <Button type="submit" onClick={handleSubmit(handleSave)}>Save</Button>
          <Button onClick={handleDiscard} variant="outlined">
            Reset
          </Button>
        </div>
      </ErrorBoundary>
    </div>
  );
}

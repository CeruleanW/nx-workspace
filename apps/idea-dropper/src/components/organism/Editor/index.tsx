import React, { useState } from 'react';
import { RichTextEditor } from './components/RichEditor';
import { Paper } from '@root/shared/components/atomics/Paper';
import { ErrorBoundary } from '@root/shared/features/error-handling';
import { CardTitle } from '../../molecule/CardTitle';
import { Button } from '@root/shared/components/atomics/Button';
import { insertCard } from '@idea/features/idea-server';
import { useAsyncFn } from 'react-use';
import { DEFAULT_INIT_VALUE, CONTENT_KEY } from './constants';
import { useContentInLocalStorage, useTitleInLocalStorage, useEditor } from './hooks';

export function Editor() {
  // Hooks
  const [saveState, executeSave] = useAsyncFn((data) => insertCard(data));
  const [value, setValue, remove] = useContentInLocalStorage();
  const [titleValue, setTitleValue] = useState('');
  const editor = useEditor();


  const handleSave = () => {
    const toBeSubmitted = value;
    console.debug('submit data', toBeSubmitted);
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
        <Paper className='w-full flex-grow'>
          <RichTextEditor value={value} editor={editor} localStorageCallbacks={{ setValue, remove }} />
        </Paper>
        <div className='flex gap-x-4 mt-4' >
          <Button onClick={handleSave} >Save</Button>
          <Button onClick={handleDiscard} variant='outlined' >Reset</Button>
        </div>
      </ErrorBoundary>
    </div>
  );
}

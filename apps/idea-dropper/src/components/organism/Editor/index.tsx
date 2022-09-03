import React from 'react';
import { RichTextEditor } from './components/RichEditor';
import { Paper } from '@root/shared/components/atomics/Paper';
import { ErrorBoundary } from '@root/shared/features/error-handling';
import { CardTitle } from '../../molecule/CardTitle';
import { Button } from '@root/shared/components/atomics/Button';
import { insertCard } from '@idea/features/idea-server';
import { useAsyncFn } from 'react-use';

export function Editor() {
  const [saveState, executeSave] = useAsyncFn((data) => insertCard(data));

  const handleSave = () => {

  };

  const handleDiscard = () => {

  }

  return (
    <div className='mx-auto w-10/12 flex flex-col'>
      <ErrorBoundary>
        <CardTitle />
        <Paper className='w-full flex-grow'>
          <RichTextEditor />
        </Paper>
        <div className='flex gap-x-4 mt-4' >
          <Button onClick={handleSave} >Save</Button>
          <Button onClick={handleDiscard} variant='outlined' >Discard</Button>
        </div>
      </ErrorBoundary>
    </div>
  );
}

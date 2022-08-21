import React from 'react';
import { RichTextEditor } from './RichEditor';
import { Paper } from '@root/shared/components/atomics/Paper';
import { ErrorBoundary } from '@root/shared/features/error-handling';
import { CardTitle } from './CardTitle';

export function Editor() {
  return (
    <ErrorBoundary>
      <div className='mx-auto w-10/12 flex flex-col'>
        <CardTitle />
        <Paper className='w-full flex-grow'>
          <RichTextEditor />
        </Paper>
      </div>
    </ErrorBoundary>
  );
}

export * from './BasicEditor';
export * from './RichEditor';

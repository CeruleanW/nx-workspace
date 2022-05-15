import React from 'react';
import { RichTextEditor } from './RichEditor';
import { Paper } from '@root/shared/components/atomics/Paper';

export function Editor() {
  return (
    <Paper className='mx-auto w-10/12'>
      <RichTextEditor />
    </Paper>
  );
}

export * from './BasicEditor';
export * from './RichEditor';

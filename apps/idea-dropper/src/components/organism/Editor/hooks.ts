import { useLocalStorage } from '@root/shared/features/local-storage';
import { useRef } from 'react';
import { createEditor } from 'slate';
import { withReact } from 'slate-react';
import { CONTENT_KEY, DEFAULT_CONTENT_VALUE, TITLE_KEY } from './constants';

export const useEditor = () => {
  const editorRef = useRef() as any;
  if (!editorRef.current) editorRef.current = withReact(createEditor());
  return editorRef.current;
};

/**
 * handle content in Editor
 * @return [contentValue, setContentValue, resetContent]
 */
export function useContentInLocalStorage() {
  const queried = useLocalStorage(CONTENT_KEY, DEFAULT_CONTENT_VALUE);
  const resetContent = () => {
    queried[1](DEFAULT_CONTENT_VALUE);
  };
  queried[2] = resetContent;
  return queried;
}

export function useTitleInLocalStorage() {
  return useLocalStorage(TITLE_KEY, '');
}

import { useLocalStorage } from '@root/shared/features/local-storage';
import { useRef } from 'react';
import { createEditor } from 'slate';
import { withReact } from 'slate-react';
import { CONTENT_KEY, DEFAULT_INIT_VALUE, TITLE_KEY } from './constants';

export const useEditor = () => {
  const editorRef = useRef() as any;
  if (!editorRef.current) editorRef.current = withReact(createEditor());
  return editorRef.current;
};

export function useContentInLocalStorage() {
  return useLocalStorage(CONTENT_KEY, DEFAULT_INIT_VALUE);
}

export function useTitleInLocalStorage() {
  return useLocalStorage(TITLE_KEY, '');
}

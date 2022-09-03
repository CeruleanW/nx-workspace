import { useAllBoxes } from '../features/idea-server';

export function useMainPageData(enabled = true) {
  const { data, error } = useAllBoxes(enabled);
  return { data, error };
}

import useSWR from 'swr';
import {getData} from '@root/shared/features/axios';

export function useMainPageData() {
  const { data, error } = useSWR('/api/box/all', getData);
  return { data, error };
}

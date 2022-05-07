import useSWR from 'swr';
import {getData} from '@root/shared/features/axios';

export function useMainPageData(enabled=true) {
  const { data, error } = useSWR(enabled ? '/api/box/all' : null, getData);
  return { data, error };
}

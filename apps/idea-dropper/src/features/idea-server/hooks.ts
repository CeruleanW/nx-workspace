import useSWR from 'swr';
import { getData } from '@root/shared/features/axios';
import { ALL_BOX } from './apis';

export function useAllBoxes(enabled = true) {
  const result = useSWR(enabled ? ALL_BOX : null, getData);
  return result;
}

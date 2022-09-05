import useSWR from 'swr';
import { getData } from '@root/shared/features/axios';
import { ALL_BOX } from './apis';
import { BoxResponseDTO } from './types';

export function useAllBoxes(enabled = true) {
  const result = useSWR<BoxResponseDTO[]>(enabled ? ALL_BOX : null, getData);
  return result;
}

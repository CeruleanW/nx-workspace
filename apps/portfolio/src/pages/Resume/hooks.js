import useSWR from 'swr';
import { fetchPersonalData, PERSONAL_DATA_LINK } from '../../lib';

export function useResumeData() {
  const { data, error } = useSWR(PERSONAL_DATA_LINK, fetchPersonalData);
  return { data, error, isLoading: !data && !error };
}

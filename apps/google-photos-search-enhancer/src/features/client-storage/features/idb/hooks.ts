import {getAllKeysOfLocalMediaItems} from './indexedDBController';
import useSWR from 'swr';

export function useIndexedDB() {
  return useSWR('AllKeysOfLocalMediaItems', getAllKeysOfLocalMediaItems)
}

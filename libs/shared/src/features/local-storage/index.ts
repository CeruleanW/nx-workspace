import { useLocalStorage as useReactUseLocalStorage} from 'react-use';

export function useLocalStorage(key, defaultValue) {
  const [value, setValue, remove] = useReactUseLocalStorage(key, defaultValue);

  return [value, setValue, remove];
}

/**
 * @deprecated should use useLocalStorage
 */
export function setToLocalStorage(key: string, value: object) {
  if (!key) {
    throw new Error('key is required');
  } else if (!window?.localStorage) {
    throw new Error('localStorage is not available');
  }

  return window.localStorage?.setItem(key, JSON.stringify(value));
}

/**
 * @deprecated should use useLocalStorage
 */
export function getLocalStorage(key: string): object {
  if (!key) {
    console.warn('key is required to getLocalStorage');
    return undefined;
  } else if (!window?.localStorage) {
    console.warn('localStorage is not available');
    return undefined;
  }

  const value = window.localStorage?.getItem(key);
  return value ? JSON.parse(value) : null;
}

export * from './useLocalStorage';

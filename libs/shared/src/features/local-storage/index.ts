export function setToLocalStorage(key: string, value: object) {
  if (!key) {
    throw new Error('key is required');
  } else if (!window?.localStorage) {
    throw new Error('localStorage is not available');
  }

  return window.localStorage?.setItem(key, JSON.stringify(value));
}

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

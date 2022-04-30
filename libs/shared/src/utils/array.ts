

/**
 * @description return if the array has at least one not-null-nor-empty-array element
 * @param  {any} obj
 */
 export function isFilledArray(obj: any) {
  return (
    obj &&
    Array.isArray(obj) &&
    obj.flat().length > 0 &&
    obj.flat()[0] !== null &&
    obj.flat()[0] !== undefined
  );
}

/**
 * 
 * @param arr1 
 * @param arr2 
 * @param prop the property name
 * @returns 
 */
 export function merge2ArraysOfObject(arr1: Array<any>, arr2: Array<any>, prop: string): any[] {

  if (!isFilledArray(arr1) || !isFilledArray(arr2)) {
    return null;
  }

  const result = arr1.map((item) => {
    const index = arr2.findIndex((item2) => item2[prop] === item[prop]);
    if (index >= 0) {
      return { ...item, ...arr2[index] };
    } else {
      return item;
    }
  });

  return result;
}
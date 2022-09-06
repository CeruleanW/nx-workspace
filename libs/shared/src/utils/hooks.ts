import { useState } from 'react';

/**
 * @deprecated use [useUpdate](https://github.com/streamich/react-use/blob/master/docs/useUpdate.md) in react-use instead
 * From https://stackoverflow.com/questions/46240647/react-how-to-force-a-function-component-to-render/53837442#53837442
 */
export function useForceUpdate(){
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value => value + 1); // update state to force render
  // An function that increment 👆🏻 the previous state like here
  // is better than directly setting `value + 1`
}

import { useAllBoxes, useUserByEmail } from '../features/idea-server';
import { useSession } from '../features/auth';

/**
 * user data
 */
export function useUser() {
  const { data: session } = useSession();
  const userEmail = session?.user?.email;
  return useUserByEmail(userEmail);
}

/**
 * fetch
 */
export function useMainPageData(enabled = true) {
  const {data: userData, error: userError} = useUser();
  // console.debug('userData', userData);

  const { data, error:boxesError } = useAllBoxes(enabled);
  return { data, boxes: data, user: userData, error: boxesError || userError};
}

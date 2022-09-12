import { useAllBoxes, useUserByEmail } from '../features/idea-server';
import { useSession } from 'next-auth/client';


export function useUser() {
  const [session, loadingSession] = useSession();
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

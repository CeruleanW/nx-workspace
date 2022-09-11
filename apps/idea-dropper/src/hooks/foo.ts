import { useAllBoxes, useUserByEmail } from '../features/idea-server';
import { useSession } from 'next-auth/client';


/**
 * fetch
 */
export function useMainPageData(enabled = true) {
  const [session, loadingSession] = useSession();
  const userEmail = session?.user?.email;
  const {data: userData, error: userError} = useUserByEmail(userEmail);
  console.debug('userData', userData);

  const { data, error:boxesError } = useAllBoxes(enabled);
  return { data, boxes: data, user: userData, error: boxesError || userError};
}

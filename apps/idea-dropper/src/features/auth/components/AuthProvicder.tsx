import { Provider } from 'next-auth/client';

export function AuthProvicder({  children, ...optionals }) {
  const {session, ...rest} = optionals;
  return (
    <Provider session={session} >{children}</Provider>
  )
}

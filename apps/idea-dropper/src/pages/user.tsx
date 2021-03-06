import { useSession } from 'next-auth/client';
import React from 'react';
import { CenteredLoading } from '@root/shared/components/atomics';
import { UserProfile } from '../components/UserProfile';
import { HomeBtn } from '../components/HomeBtn';

export default function User() {
  const [session, loading] = useSession();

  if (loading) {
    return <CenteredLoading />;
  }

  return (
    <div className={'p-4'}>
      <UserProfile user={session?.user} />
      <div className='mt-2'>
        <HomeBtn />
      </div>
    </div>
  );
}

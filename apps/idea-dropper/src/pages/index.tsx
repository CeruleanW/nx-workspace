// import Head from 'next/head';
import React from 'react';
import Link from 'next/link';
import { APPNAME } from '@idea/lib/CONSTANTS';
import { Button } from '@root/shared/components/atomics';
import { useSession, signIn, signOut, signout } from 'next-auth/client';
import { FrameWrapper } from '../components/FrameWrapper';
import { Loading } from '@root/shared/components/atomics';

export default function Index() {
  const [session, loading] = useSession();

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <FrameWrapper title='Home'>
        <main className='max-w-full flex-auto flex flex-col justify-center'>
          <h1 className='title'>{APPNAME}</h1>
          <div className='mt-10'>
            <p className='text-center'>Drop your ideas in the box</p>
            <p className='text-center'>Draw your ideas for inspiration </p>
          </div>
          <div className='mt-4 flex justify-center items-center space-x-4'>
            {session ? (
              <>
                <Link href={`/user/${encodeURIComponent(session?.user?.email)}`}>
                  <Button>Go to User Page</Button>
                </Link>
                <Button onClick={signout}>Logout</Button>
              </>
            ) : (
              <>
                <Button onClick={signIn}>Login</Button>
                <Link href='/signup'>
                  <Button>Sign up</Button>
                </Link>
              </>
            )}
          </div>
        </main>
      </FrameWrapper>
      <style jsx>{`
        .title a {
          color: #0070f3;
          text-decoration: none;
        }
        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }
        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }
        .title,
        .description {
          text-align: center;
        }
        .subtitle {
          font-size: 2rem;
        }
        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }
        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          max-width: 800px;
          margin-top: 3rem;
        }
        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }
        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }
        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }
        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }
        .logo {
          height: 1em;
        }
        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>
    </>
  );
}

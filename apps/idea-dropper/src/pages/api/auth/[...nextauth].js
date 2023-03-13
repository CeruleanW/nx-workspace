import NextAuth from 'next-auth';
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import {connectToDatabase} from '@root/shared/features/mongodb';

export default NextAuth({
  providers: [
    // Providers.Apple({
    //   clientId: process.env.APPLE_ID,
    //   clientSecret: process.env.APPLE_SECRET
    // }),
    // Providers.Facebook({
    //   clientId: process.env.FACEBOOK_ID,
    //   clientSecret: process.env.FACEBOOK_SECRET
    // }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
    // Providers.GitHub({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET
    // }),
    // // Passwordless / email sign in
    // Providers.Email({
    //   server: process.env.MAIL_SERVER,
    //   from: 'NextAuth.js <no-reply@example.com>'
    // }),
  ],
  // Optional SQL or MongoDB database to persist users
  database: process.env.DATABASE_URL,
  // adapter: MongoDBAdapter(connectToDatabase),
})

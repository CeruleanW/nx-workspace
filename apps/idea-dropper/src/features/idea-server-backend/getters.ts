import {
  connectToDatabase,
} from '@root/shared/features/mongodb';
import {USERS_COLLECTION} from '../idea-server/collections';

export async function getUserByEmail(userEmail: string) {
  // console.log("Retrieving all the boxes for user ");
  // // authentication - if fails, redirect to login page
  // const myUsername = getUsername(req.cookies);
  // const myPassword = getPassword(req.cookies);

  const { db } = await connectToDatabase();
  const result = await db
    .collection(USERS_COLLECTION)
    .find({})
  return result;
}

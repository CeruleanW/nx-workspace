import { connectToDatabase } from '@root/shared/features/mongodb';
import { USERS_COLLECTION } from '@idea/features/idea-server-backend';

export default async (req, res) => {
  const { db } = await connectToDatabase();
  // authentication - if fails, redirect to login page
  const { email } = req.query || {};
  console.debug('email', email);

  //return the user document
  const userCursor = await db.collection(USERS_COLLECTION).findOne({ email });

  res.json(userCursor);
};

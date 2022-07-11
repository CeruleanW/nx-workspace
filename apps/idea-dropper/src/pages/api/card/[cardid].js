import { connectToDatabase } from '@root/shared/features/mongodb';
import { getSession } from 'next-auth/client';

//request a card by its id
export default async (req, res) => {
  const session = await getSession({ req })

  if (session) {
    const { db } = await connectToDatabase();
    const card = await db
      .collection('box')
      .find({})
      .sort({ 'last-access-date': -1 })
      .limit(20)
      .toArray();
    res.json(card);
    // res.send({ content: 'This is protected content. You can access this content because you are signed in.' })
  } else {
    res.send({ error: 'You must be signed in to access this api route' })
  }


};

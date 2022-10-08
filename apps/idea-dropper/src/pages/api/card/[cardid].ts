import { connectToDatabase } from '@root/shared/features/mongodb';
import { getSession } from 'next-auth/client';
import {
  CARD_COLLECTION,
  findCardById,
} from '@idea/features/idea-server-backend';

//request a card by its id
export default async (req, res) => {
  const { cardid } = req.query || {};
  const session = await getSession({ req });
  if (session) {
    const { db } = await connectToDatabase();
    // const card = await db
    //   .collection(CARD_COLLECTION)
    //   .find({})
    //   .sort({ 'last-access-date': -1 })
    //   .limit(20)
    //   .toArray();
    if (req.method === 'GET') {
      const foundCard = await findCardById(cardid);
      res.json(foundCard);
    } else if (req.method === 'POST') {
    } else if (req.method === 'DELETE') {

    }
    res.send('No handler for this request method');
  } else {
    res.send({
      error:
        'This is protected content. You must be signed in to access this api route',
    });
  }
};

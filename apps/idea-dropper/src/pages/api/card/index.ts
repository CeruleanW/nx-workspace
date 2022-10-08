import { connectToDatabase } from '@root/shared/features/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';
import { CARD_COLLECTION } from '@idea/features/idea-server-backend';
import {
  createCardDoc,
  getAllCards,
  deleteAllCards,
  insertNewCard,
} from '@idea/features/idea-server-backend';
//TODO: destruct request body to get data from client

type RequestBody = {
  cardData: {
    title: string;
    content: any;
  };
  boxId: string;
};

//add a card to a box
export default async (
  req: NextApiRequest & { body: RequestBody },
  res: NextApiResponse
) => {
  if (req.method === 'POST') {
    try {
      const { cardData } = req.body || {};

      const result = await insertNewCard(cardData);
      console.log('insert new card result', result);
      // process result
      const { insertedId } = result || {};

      return res.status(200).send({ insertedId });
    } catch (error) {
      console.error(error);
      return res.status(500).send('Insertion failed');
    }
  } else if (req.method === 'GET') {
    const result = await getAllCards();
    res.status(200).json(result);
  } else if (req.method === 'DELETE') {
    await deleteAllCards();
    res.status(200).send('Deletion success!');
  } else {
    res.send(`${req.method} method is not supported`);
  }
};

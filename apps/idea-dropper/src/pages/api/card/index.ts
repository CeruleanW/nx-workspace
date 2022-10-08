import { connectToDatabase } from '@root/shared/features/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';
import { CARD_COLLECTION } from '@idea/features/idea-server-backend';
import {
  createCardDoc,
  getAllCards,
  deleteAllCards,
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
    const { db } = await connectToDatabase();
    const { cardData } = req.body || {};
    const { title, content, owner, boxes } = cardData || {};

    const createdDate = new Date();

    const doc = createCardDoc(title, owner, content, createdDate, boxes);

    db.collection(CARD_COLLECTION)
      .insertOne(doc)
      .then(function (result) {
        // process result
        const objResult = JSON.parse(result);
        const { ok, insertedId } = objResult;
        // console.log(ok);
        if (ok) {
          return res.status(200).send({ insertedId });
        }
        return res.send('Insertion failed');
      });
  } else if (req.method === 'GET') {
    const result = await getAllCards();
    res.status(200).json(result);
  } else if (req.method === 'DELETE') {
    await deleteAllCards();
    res.status(200).send('Deletion success!')
  } else {
    res.send(`${req.method} method is not supported`);
  }
};

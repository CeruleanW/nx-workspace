import { connectToDatabase } from '@root/shared/features/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
const ObjectID = require('mongodb').ObjectID;
import { CARD_COLLECTION } from '@idea/features/idea-server';
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
    const { cardData } = req.body;
    const { title, content, owner } = cardData || {};

    const createdDate = new Date();

    const doc = createCardDoc(title, ObjectID(owner), content, createdDate);

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
  } else {
    res.send('This API cannot be accessed by GET method');
  }
};

function createCardDoc(title: string, owner: string, content, createdDate) {
  return {
    title,
    'created-date': createdDate,
    'last-updated-date': createdDate,
    'last-access-date': createdDate,
    owner,
    content,
  };
}

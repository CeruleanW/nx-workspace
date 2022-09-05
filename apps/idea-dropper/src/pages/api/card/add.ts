import { connectToDatabase } from '@root/shared/features/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
const ObjectID = require('mongodb').ObjectID;

//TODO: destruct request body to get data from client

type RequestBody = {
  cardData: {
    title: string;
    content: any;
  };
  boxId: string;
};

const ownerIdString = '603449406a2ed67286c5d810';

//add a card to a box
export default async (
  req: NextApiRequest & { body: RequestBody },
  res: NextApiResponse
) => {
  if (req.method === 'POST') {
    const { db } = await connectToDatabase();
    const { cardData, boxId } = req.body;
    const { title, content } = cardData || {};

    const createdDate = new Date();
    const owner = new ObjectID(ownerIdString); //this user

    const doc = createCardDoc(title, owner, content, createdDate);

    db.collection('card')
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

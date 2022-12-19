import { connectToDatabase } from '@root/shared/features/mongodb';
import { BOX_COLLECTION, createBoxDoc, createCardDoc } from '@idea/features/idea-server-backend';
import { CreateBoxDTO } from '../../../features/idea-server';

/**
 * /box
 */
export default async (req: {body: CreateBoxDTO; [x:string]: any}, res) => {
  // // authentication - if fails, redirect to login page
  // const myUsername = getUsername(req.cookies);
  // const myPassword = getPassword(req.cookies);

  try {
    const {body} = req || {};
    if (!body) {
      res.status(400).json({ error: 'Missing body' });
      return;
    }

    const { db } = await connectToDatabase();
    const nextBox = createBoxDoc(body);
    const inserted = await db
      .collection(BOX_COLLECTION)
      .insertOne(nextBox);
    console.debug('nextBox', nextBox);
    res.status(200).json(inserted);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

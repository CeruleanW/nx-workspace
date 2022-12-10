import { connectToDatabase } from '@root/shared/features/mongodb';
import { BOX_COLLECTION } from '@idea/features/idea-server-backend';
import { CreateBoxDTO } from '../../../features/idea-server';

export default async (req: {body: CreateBoxDTO; [x:string]: any}, res) => {
  // // authentication - if fails, redirect to login page
  // const myUsername = getUsername(req.cookies);
  // const myPassword = getPassword(req.cookies);

  try {
    // const {} = req.body;
    if (!req.body) {
      res.status(400).json({ error: 'Missing body' });
      return;
    }

    const { db } = await connectToDatabase();
    // const nextBox = req.body;
    const nextBox = await db
      .collection(BOX_COLLECTION)
      .insertOne(req.body);
    console.debug('nextBox', nextBox);
    res.status(200).json(nextBox);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

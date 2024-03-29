import { connectToDatabase } from '@root/shared/features/mongodb';
import { BOX_COLLECTION } from '@idea/features/idea-server-backend';

export default async (req, res) => {
  console.log('Retrieving all the boxes from box API');
  // // authentication - if fails, redirect to login page
  // const myUsername = getUsername(req.cookies);
  // const myPassword = getPassword(req.cookies);

  try {
    if (req.method === 'GET') {
      const { db } = await connectToDatabase();
      const boxes = await db
        .collection(BOX_COLLECTION)
        .find({})
        .sort({ 'last-access-date': -1 })
        .limit(20)
        .toArray();
      res.status(200).json(boxes);
    } else if (req.method === 'POST') {

    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

import {
  connectToDatabase,
} from '@root/shared/features/mongodb';
import { ObjectId } from "mongodb";
import {
  BOX_COLLECTION,
} from '@idea/features/idea-server-backend';

/**
 * update draw pointer
 * if reach the end of box, reset draw pointer to zero
 */
export default async (req, res) => {
  const { db } = await connectToDatabase();
  // authentication - if fails, redirect to login page
  const { box_id } = req.query || {};
  const boxID = new ObjectId(box_id);

  const box = await db.collection(BOX_COLLECTION).findOne({ _id: new ObjectId(box_id)});
  // const box = boxCursor.pretty();
  const {_id, shared_with, tags, cards, draw_pointer, draw_sequence} = box || {};
  const nextDrawSequence = draw_sequence;

  res.json(box);
};

// export default

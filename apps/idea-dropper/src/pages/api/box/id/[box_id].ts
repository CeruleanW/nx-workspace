import { CARD_COLLECTION } from './../../../../features/idea-server-backend/collections';
import {
  connectToDatabase,
} from '@root/shared/features/mongodb';
import { ObjectId } from "mongodb";
import {
  BOX_COLLECTION,
  getNextDrawCardID
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
  // draw a card from this box
  const nextCardID: ObjectId = getNextDrawCardID(draw_sequence, draw_pointer, cards);
  console.debug('nextCardID', nextCardID);
  const card = await db.collection(CARD_COLLECTION).findOne({_id: nextCardID});
  console.debug('card', card);

  // update draw_pointer
  if (card) {
    await db.collection(BOX_COLLECTION).updateOne({_id: boxID}, {$inc: {draw_pointer: 1}});
    if (draw_pointer === cards.length - 1) {
      await db.collection(BOX_COLLECTION).updateOne({_id: boxID}, {$set: {draw_pointer: 0}});
    }
  } else {
    await db.collection(BOX_COLLECTION).updateOne({_id: boxID}, {$set: {draw_pointer: 0}});
  }

  res.json(card);
};

// export default

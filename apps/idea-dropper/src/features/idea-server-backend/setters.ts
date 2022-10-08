import { connectToDatabase } from '@root/shared/features/mongodb';
import { USERS_COLLECTION, CARD_COLLECTION } from './collections';
import { ObjectId } from 'mongodb';
import { getCardCollection } from './collections';

export function createCardDoc(
  title: string,
  owner: string,
  content: any[],
  createdDate,
  rawBoxes?: string[]
) {
  const ownerObj = new ObjectId(owner);
  const boxes = rawBoxes?.map((boxID) => new ObjectId(boxID)) || [];

  return {
    title,
    'created-date': createdDate,
    'last-updated-date': createdDate,
    'last-access-date': createdDate,
    ownerObj,
    content,
    boxes: boxes,
  };
}

export function createBoxDoc() {}

export async function deleteAllCards() {
  const cardCollection = await getCardCollection();
  const result = await cardCollection.deleteMany({});
  return result;
}

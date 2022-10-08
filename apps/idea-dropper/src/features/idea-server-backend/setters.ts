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

export async function insertNewCard(cardData) {
  console.debug('insertNewCard input', cardData);
  const cardCollection = await getCardCollection();
  const { title, content, owner, boxes } = cardData || {};
  const createdDate = new Date();
  const doc = createCardDoc(title, owner, content, createdDate, boxes);
  const result = await cardCollection.insertOne(doc);
  console.log('insert new card result', result);
  // process result
  const { acknowledged, insertedId } = result;
  // console.log(ok);
  if (!acknowledged) {
    throw new Error('Insertion failed');
  }

  return {insertedId};
}

export function createBoxDoc() {}

export async function deleteAllCards() {
  const cardCollection = await getCardCollection();
  const result = await cardCollection.deleteMany({});
  return result;
}

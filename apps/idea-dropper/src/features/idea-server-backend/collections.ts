import { connectToDatabase } from '@root/shared/features/mongodb';

export const USERS_COLLECTION = 'users';

export const BOX_COLLECTION = 'box';

export const CARD_COLLECTION = 'card';


export async function getCardCollection() {
  const { db } = await connectToDatabase();
  const result = db.collection(CARD_COLLECTION);
  return result;
}

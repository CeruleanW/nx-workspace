import { connectToDatabase } from '@root/shared/features/mongodb';
import { ObjectId } from "mongodb";

export default async (req, res) => {
  // authentication - if fails, redirect to login page
  // const myUsername = getUsername(req.cookies);
  // const myPassword = getPassword(req.cookies);

  //return the user document
  const { db } = await connectToDatabase();
  const userCursor = await db
    .collection('user')
    .findAll();
  res.json(userCursor);
};

function iterateFunc(doc) {
  console.log(JSON.stringify(doc, null, 4));
}

function errorFunc(error) {
  console.log(error);
}

import { connectToDatabase } from "../../../utils/mongodb";

export default async (req, res) => {
  console.log("Retrieving all the boxes from box API");
  // // authentication - if fails, redirect to login page
  // const myUsername = getUsername(req.cookies);
  // const myPassword = getPassword(req.cookies);

  const { db } = await connectToDatabase();
  const boxes = await db
    .collection("box")
    .find({})
    .sort({ "last-access-date": -1 })
    .limit(20)
    .toArray();
  res.status(200).json(boxes);
};
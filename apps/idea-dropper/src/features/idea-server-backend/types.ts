import { ObjectId, Collection } from "mongodb";

export type CardDocument = {
  id: ObjectId
  [x: string]: any
};

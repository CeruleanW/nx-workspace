import { ObjectId, Collection } from "mongodb";

export type CardDocument = {
  id: ObjectId;
  [x: string]: any
};


export type BoxDocument = {
  id?: ObjectId;
  name: string;
  owner: ObjectId;
  [x: string]: any
};

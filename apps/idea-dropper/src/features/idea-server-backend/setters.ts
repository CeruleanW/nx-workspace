import { } from '@root/shared/features/mongodb';
import { ObjectId } from "mongodb";

export function createCardDoc(title: string, owner: string, content: any[], createdDate, rawBoxes?: string[]) {
  const boxes = rawBoxes?.map(boxID => ObjectId(boxID)) || [];

  return {
    title,
    'created-date': createdDate,
    'last-updated-date': createdDate,
    'last-access-date': createdDate,
    owner,
    content,
    boxes: boxes,
  };
}

export function createBoxDoc() {

}

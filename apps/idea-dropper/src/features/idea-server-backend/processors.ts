import { isFilledArray } from "@root/shared/utils";
import { ObjectId } from "mongodb";

/**
 *
 */
export function getNextDrawCardID(draw_sequence: number[], draw_pointer: number, cards: ObjectId[]) {
  if (!isFilledArray(cards)) {
    return null;
  }

  if (draw_pointer >= draw_sequence.length) {
    return null;
  }

  const next = draw_sequence[draw_pointer];
  const nextCardID = cards[next];
  return nextCardID;
}

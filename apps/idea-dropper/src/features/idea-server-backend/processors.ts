import { isFilledArray } from "@root/shared/utils";
import { ObjectId } from "mongodb";
import {getRandomArrayFromSeed} from '@root/shared/features/random';

/**
 *
 */
export function getNextDrawCardID(draw_seed: number[], draw_pointer: number, cards: ObjectId[]) {
  console.debug('getNextDrawCardID inputs', draw_seed, draw_pointer, cards);
  if (!isFilledArray(cards)) {
    return null;
  }

  if (draw_pointer >= cards.length) {
    return null;
  }
  const sample = getRandomArrayFromSeed(cards, draw_seed);
  const nextCardID = sample[draw_pointer];
  return nextCardID;
}

import axios from 'axios';
import {getData, post} from '@root/shared/features/axios';
import { handle } from '@root/shared/utils';
import { CARD, BOX } from './apis';
import { CreateCardDTO, CreateBoxDTO } from './types';

//Data operations a user can perform on the App

export async function fetchBoxes() {}

export async function fetchNextCard(boxId) {}

export async function randomnizeSequence(boxId) {}

export async function insertCard(data: CreateCardDTO): Promise<any> {
  // process data
  console.debug('insertCard', data);
  // call API
  const [result, resultErr] = await handle(axios.post(CARD, data));
  if (resultErr) throw new Error('Could not insert the card to database');
  // return response
  return result;
}

export async function insertMultipleCards(cardArray) {}
export async function addBox(data: CreateBoxDTO) {
  return await axios.post(BOX, data);
}

export async function deleteCard(cardId) {}
export async function deleteBox(boxId) {}
export async function drawCard(boxID: string) {
  const url = `${BOX}/id/${boxID}`;
  return await post(url);
}
export async function drawCards(boxId, num) {}

import axios from 'axios';
import { handle } from '@root/shared/utils';
import { CARD } from './apis';
import { CreateCardDTO } from './types';

//Data operations a user can perform on the App

export async function fetchBoxes() {}

export async function fetchNextCard(boxId) {}

export async function randomnizeSequence(boxId) {}

export async function insertCard(data: CreateCardDTO): Promise<any> {
  // process data
  // call API
  const [result, resultErr] = await handle(axios.post(CARD, data));
  if (resultErr) throw new Error('Could not insert the card to database');
  // return response
  return result;
}

export async function insertMultipleCards(cardArray) {}
export async function deleteCard(cardId) {}
export async function deleteBox(boxId) {}
export async function drawCard(boxId) {}
export async function drawCards(boxId, num) {}

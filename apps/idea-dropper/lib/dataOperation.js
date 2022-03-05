const axios = require('axios');
import { handle } from '../utils';

//Data operations a user can perform on the App

async function getBoxes() {}

async function getNextCard(boxId) {}

async function randomnizeSequence(boxId) {}

async function insertCard(data) {
  // process data
  // call API
  const [result, resultErr] = await handle(axios.post('./card/add', data));
  if (resultErr) throw new Error('Could not insert the card to database');
  // return response
  return result;
}

async function insertMultipleCards(cardArray) {}
async function deleteCard(cardId) {}
async function deleteBox(boxId) {}
async function drawCard(boxId) {}
async function drawCards(boxId, num) {}

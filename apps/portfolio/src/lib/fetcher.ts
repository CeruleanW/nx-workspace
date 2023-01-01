import axios from 'axios';
import yaml from 'js-yaml';
// import { PERSONAL_DATA_LINK, PROJECTS_DATA_LINK } from './apis';
import {getPersonalDataFileUrl, getProjectsDataFileUrl} from '../features/firebase';

export async function fetchLocalPersonalData() {
  getPersonalDataFileUrl().then(fulfilled => {
    console.debug('fetchPersonalData getPersonalDataFileUrl', fulfilled);
  })
  const res = await axios.get('http://localhost:4200/static/personal-data.yaml');
  return yaml.load(res.data);
}

export async function fetchPersonalData(): Promise<any> {
  // console.debug('fetchPersonalData', getPersonalDataFileUrl());
  const url = await getPersonalDataFileUrl();
  const res = await axios.get(url);
  return yaml.load(res.data);
}

export async function fetchProjectsData() {
  const url = await getProjectsDataFileUrl();
  const res = await axios.get(url);
  return res?.data;
}

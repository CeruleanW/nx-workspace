import {storage} from './config';
import { getStorage, ref, getDownloadURL } from "firebase/storage";

// Create a child reference
const DATA_FOLDER = 'data';
export const personalDataRef = ref(storage, `${DATA_FOLDER}/personal-data.yaml`);
export const projectsDataRef = ref(storage, `${DATA_FOLDER}/projects.json`);

export async function getPersonalDataFileUrl() {
  return getDownloadURL(personalDataRef);
}

export async function getProjectsDataFileUrl() {
  return getDownloadURL(projectsDataRef);
}

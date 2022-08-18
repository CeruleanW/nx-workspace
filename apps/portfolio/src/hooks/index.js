import { fetchProjectsData, PROJECTS_DATA_LINK, PERSONAL_DATA_LINK, fetchPersonalData } from '../lib';
import useSWR from 'swr';

export function useProjectsData() {
  const { data, error } = useSWR(PROJECTS_DATA_LINK, fetchProjectsData);
  return { projectData: data, error, isLoading: !data && !error };
}

export function useProjectDataByID(id) {
  const { projectData, error, isLoading } = useProjectsData();
  let project;
  if (projectData) {
    project = projectData?.projects?.find((project) => project.id === id);
  }

  return { projectData: project, error, isLoading };
}


export function usePersonalData() {
  const { data, error } = useSWR(PERSONAL_DATA_LINK, fetchPersonalData);
  return { data, error, isLoading: !data && !error };
}

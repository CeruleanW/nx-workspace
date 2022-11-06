import { MainResume } from './MainResume';
import { useResumeData } from './hooks';
import { ErrorMsg } from '@root/shared/components/atomics/ErrorMsg';
import { Loading } from '@root/shared/components/atomics';

const version = 'back-end';

export function Resume(props) {
  const { data: resumeData, isLoading, error } = useResumeData();

  // Conditions
  if (error) {
    console.error('Resume error', error);
    return <ErrorMsg text={`Error! ${error?.messsage}`} error={error} ></ErrorMsg>;
  }

  if (isLoading) {
    return <Loading />;
  }

  // console.debug('resumeData', resumeData);
  const { names, resume, resumeVersions } = resumeData || {};
  const data = resumeVersions?.find(item => item.version === version);

  return <MainResume {...names} {...resume} {...data} />;
}

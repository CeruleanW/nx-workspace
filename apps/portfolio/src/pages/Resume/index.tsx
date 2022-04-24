import { MainResume } from './MainResume';
import { useResumeData } from './hooks';
import { ErrorMsg } from '@root/shared/components/atomics/ErrorMsg';
import { Loading } from '@root/shared/components/atomics';

export function Resume(props) {
  const { data: resumeData, isLoading, error } = useResumeData();
  const version = 'frontend';

  // Conditions
  if (error) {
    console.error('Resume error', error);
    return <ErrorMsg text={`Error! ${error?.messsage}`} error={error} ></ErrorMsg>;
  }

  if (isLoading) {
    return <Loading />;
  }

  return <MainResume {...resumeData?.names} {...resumeData?.resume} />;
}

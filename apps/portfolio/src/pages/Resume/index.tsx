import React from 'react';
import { MainResume } from './Resume';
import { useResumeData } from './hooks';
import { Loading } from '../../components/atomics/Loading';

export function Resume(props) {
  const { data: resumeData, isLoading, error } = useResumeData();
  const version = 'frontend';

  if (error) {
    return <div>Error! {error?.messsage}</div>;
  }

  if (isLoading) {
    return <Loading />;
  }

  return <MainResume {...resumeData?.names} {...resumeData?.resume} />;
}

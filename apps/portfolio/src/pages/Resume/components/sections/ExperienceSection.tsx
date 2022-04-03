import React from 'react';
import Section from '../ResumeSectionWrapper';
import Title from '../atomics/Title';
import Job from '../atomics/Job';
import PositionTitle from '../atomics/PositionTitle';
import CompanyName from '../atomics/CompanyName';
import CompanyIntro from '../atomics/CompanyIntro';
import Duration from '../Duration';
import Location from '../atomics/Location';
import Features from '../Features';

const MAX_NUMBER = 3;

export function ExperienceSection({ experience, ...optionals }) {
  const displayedExp = experience?.slice(0, MAX_NUMBER);

  return (
    <Section id='experience'>
      <Title text='Experience' />
      {displayedExp.slice(0, MAX_NUMBER)?.map((job) => {
        const { company, time } = job || {};

        return (
          <Job id={job['job-title']} key={job['job-title']}>
            <PositionTitle>{job['job-title']}</PositionTitle>
            <CompanyName>{company['company-name']}</CompanyName>
            {company['company-introduction'] ? (
              <CompanyIntro>{company['company-introduction']}</CompanyIntro>
            ) : null}
            <Duration from={time?.from} to={time?.to} className='opacity-80' />
            <span className='mr-20'></span>
            <Location className='opacity-80'>
              {company['company-location']}
            </Location>
            <Features features={job.features}></Features>
          </Job>
        );
      })}
    </Section>
  );
}

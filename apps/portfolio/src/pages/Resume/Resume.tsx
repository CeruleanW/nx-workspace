import React, { useRef } from 'react';
import Section from './components/ResumeSectionWrapper';
import Title from './components/atomics/Title';
import Content from './components/atomics/Content';
import '../../styles/pages/resume.scss';
import ReactToPrint from 'react-to-print';
import { FIRSTNAME, LASTNAME } from '../../data/globals';
import { SkillsSection } from './components/sections/SkillsSection';
import { HeaderSection } from './components/sections/HeaderSection';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { EducationSection } from './components/sections/EducationSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { LanguageSection } from './components/sections/LanguageSection';

const PDF_NAME = FIRSTNAME + LASTNAME + '_Resume';

export function MainResume(props) {
  const fullName = props['full-name'];
  const phone = props['phone-numer'];
  const { email, title, skills, experience, education, languages, location: address, links } = props || {};
  const { github, portfolio } = links || {};
  const summaryContent = props.summary.version.short;
  const sideProjects = props['side-projects'];

  const pdfDOM = useRef(null);

  return (
    <>
      <div className='h-12'></div>
      <article
        className='max-w-screen-lg m-auto resume-container px-4'
        ref={pdfDOM}
      >
        <HeaderSection
          name={fullName}
          {...{ phone, address, email, github, portfolio, title }}
        />
        <Section id='summary'>
          <Title text='Summary' />
          <Content>{summaryContent}</Content>
        </Section>
        <SkillsSection skills={skills} />
        <ExperienceSection experience={experience} />
        <ProjectsSection projects={sideProjects} />
        <EducationSection education={education} />
        <LanguageSection languages={languages} />{' '}
      </article>

      <div className='flex justify-center mt-16'>
        <ReactToPrint
          trigger={() => (
            <button className='m-auto print-button button -blue'>Print</button>
          )}
          content={() => pdfDOM.current}
          documentTitle={PDF_NAME}
        />
      </div>
    </>
  );
}

import React from 'react';
import Section from '../ResumeSectionWrapper';
import Title from '../atomics/Title';
import SkillItem from '../atomics/SkillItem';

const MAX_FRONTEND_SKILLS = 10;
const MAX_BACKEND_SKILLS = 7;
const MAX_GENERAL_SKILLS = 6;

function renderSkillItems(arr) {
  return arr.map((skill) => (
    <SkillItem key={'key-' + skill}>{skill}</SkillItem>
  ));
}

export function SkillsSection(props) {
  const { skills } = props;
  const { frontEnd, backEnd, general } = skills;
  return (
    <Section id='skills'>
      <Title text='Tech Skills' />
      {/* map the skill list to each component */}
      <div className='flex flex-wrap mt-4 justify-start'>
        {renderSkillItems(frontEnd.slice(0, MAX_FRONTEND_SKILLS))}
        {renderSkillItems(backEnd.slice(0, MAX_BACKEND_SKILLS))}
        {renderSkillItems(general.slice(0, MAX_GENERAL_SKILLS))}
      </div>
    </Section>
  );
}

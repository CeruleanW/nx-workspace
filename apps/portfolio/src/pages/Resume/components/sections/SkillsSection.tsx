import Section from '../ResumeSectionWrapper';
import Title from '../atomics/Title';
import SkillItem from '../atomics/SkillItem';

const MAX_FRONTEND_SKILLS = 10;
const MAX_BACKEND_SKILLS = 7;
const MAX_GENERAL_SKILLS = 6;

function SkillList({ list, ...optionals }) {
  const {type = 'Misc', isFirst = false, ...rest} = optionals;

  if (!list) return null;

  return (
    <div className={`flex flex-wrap justify-start items-center ${isFirst ? '' : 'mt-3'}`}>
      <span className='text-xl'>{type}: </span>{list.map((skill) => (
        <SkillItem key={'key-' + skill}>{skill}</SkillItem>
      ))}
    </div>
  );
}

export function SkillsSection({ skills, ...optionals }) {
  const { frontEnd, backEnd, tools, methodologies } = skills || {};

  return (
    <Section id="skills">
      <Title text="Tech Skills" />
      {/* map the skill list to each component */}
      <div className="flex flex-wrap mt-4 justify-start">
        <SkillList list={frontEnd?.slice(0, MAX_FRONTEND_SKILLS)} type='Front-End' isFirst />
        <SkillList list={backEnd?.slice(0, MAX_BACKEND_SKILLS)} type='Back-End' />
        <SkillList list={tools?.slice(0, MAX_GENERAL_SKILLS)} type={'Tools'} />
        <SkillList list={methodologies?.slice(0, MAX_GENERAL_SKILLS)} type={'Methodologies'} />
      </div>
    </Section>
  );
}

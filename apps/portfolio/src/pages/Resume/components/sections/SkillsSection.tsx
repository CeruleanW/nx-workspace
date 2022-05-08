import Section from '../ResumeSectionWrapper';
import Title from '../atomics/Title';
import SkillItem, {SkillItem2} from '../atomics/SkillItem';
import { Stack } from '@mui/material';

const MAX_FRONTEND_SKILLS = 10;
const MAX_BACKEND_SKILLS = 8;
const MAX_GENERAL_SKILLS = 6;

export function SkillType({text, ...optionals}) {
  const {className, ...rest} = optionals;
  return <p {...rest} className={`text-xl mr-2 mb-2 shrink-0 w-40 ${className ?? ''}`}>{text}: </p>
}

export function SkillItemContainer({children, ...optional}) {
  return <Stack spacing={1} direction="row" className='flex-wrap items-center flex-1' sx={{
    '>:not(style)+:not(style)': {
      marginBottom: '0.5rem'
    }
  }} >{children}</Stack>
}

export function SkillList({ list, ...optionals }) {
  const {type = 'Misc', isFirst = false, ...rest} = optionals;

  if (!list) return null;

  return (
    <div className={`flex flex-wrap justify-start items-start mb-2 ${isFirst ? '' : 'mt-1'}`}>
      <SkillType text={type} />
      <div className='flex flex-wrap items-start flex-1 space-x-2' >
        {list.map((skill) => (
          <SkillItem2 key={'key-' + skill} text={skill} />
        ))}
      </div>
    </div>
  );
}

export function SkillsSection({ skills, ...optionals }) {
  const { frontEnd, backEnd, tools, methodologies } = skills || {};

  return (
    <Section id="skills">
      <Title text="Tech Skills" />
      {/* map the skill list to each component */}
      <div className="flex flex-col mt-4 justify-start w-full">
        <SkillList list={frontEnd?.slice(0, MAX_FRONTEND_SKILLS)} type='Front-End' isFirst />
        <SkillList list={backEnd?.slice(0, MAX_BACKEND_SKILLS)} type='Back-End' />
        <SkillList list={tools?.slice(0, MAX_GENERAL_SKILLS)} type={'Tools'} />
        <SkillList list={methodologies?.slice(0, MAX_GENERAL_SKILLS)} type={'Methodologies'} />
      </div>
    </Section>
  );
}

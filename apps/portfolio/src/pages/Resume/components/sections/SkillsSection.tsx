import Section from '../ResumeSectionWrapper';
import Title from '../atomics/Title';
import SkillItem, {SkillItem2} from '../atomics/SkillItem';
import { Stack } from '@mui/material';

const MAX_FRONTEND_SKILLS = 10;
const MAX_BACKEND_SKILLS = 7;
const MAX_GENERAL_SKILLS = 6;

function SkillList({ list, ...optionals }) {
  const {type = 'Misc', isFirst = false, ...rest} = optionals;

  if (!list) return null;

  return (
    <div className={`flex flex-wrap justify-start items-center ${isFirst ? '' : 'mt-1'}`}>
      <Stack spacing={1} direction="row" className='flex-wrap items-center' sx={{
        '>:not(style)+:not(style)': {
          marginBottom: '0.5rem'
        }
      }} >
        <p className='text-xl mr-2 mb-2'>{type}: </p>
        {list.map((skill) => (
          <SkillItem2 key={'key-' + skill} text={skill} />
        ))}
      </Stack>
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

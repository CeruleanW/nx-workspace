import React from 'react';
import Heading from '../atomics/Heading';
import {
  Typography,
  ListItem,
} from '@material-ui/core';
import styles from '../../styles/components/components.module.scss';

const SkillSet = (props) => {
  const { title } = props;

  return (
    <div className='mb-4'>
      <p className={`${styles['skill-header']} mb-3`}>{title}</p>
      <div className='w-full flex pl-4 flex-wrap'>{props.children}</div>
    </div>
  );
};

const SimpleSkill = (props) => {
  return (
    <ListItem>
      <Typography>
        <span style={{ color: 'cadetblue', marginRight: '6px' }}>●</span>
        {props.children}
      </Typography>
    </ListItem>
  );
};

const Skill = (props) => {
  return <li className={`${styles['skill-item']}`}>{props.children}</li>;
};

const ExpandableSkill = (props) => {
  return <SimpleSkill>{props.children}</SimpleSkill>;
};

export default function MySkills() {
  return (
    <>
      <Heading>My Skills</Heading>
      <div className='flex flex-col justify-between lg:flex-row mt-8'>
        <SkillSet title={'Coding Language'}>
          <Skill>JavaScript</Skill>
          <Skill>TypeScript</Skill>
          <Skill>Java</Skill>
          <Skill>HTML5</Skill>
          <Skill>CSS3</Skill>
          <Skill>Sass/Scss</Skill>
          <Skill>SQL</Skill>
          <Skill>Python</Skill>
        </SkillSet>
        <SkillSet title={'Frameworks & Libs'}>
          <Skill>React.js</Skill>
          <Skill>Redux</Skill>
          <Skill>React Native</Skill>
          <Skill>Next.js</Skill>
          <Skill>TailwindCSS</Skill>
          <Skill>Material UI</Skill>
          <Skill>Jest, JUnit</Skill>
        </SkillSet>
        <SkillSet title={'Methods & Tools'}>
          <Skill>Agile Methodology</Skill>
          <Skill>Webpack</Skill>
          <Skill>Babel</Skill>
          <Skill>MongoDB</Skill>
          <Skill>MatLab</Skill>
          <Skill>R</Skill>
          <Skill>Test-Driven Development</Skill>
        </SkillSet>
        <SkillSet title={'Additional'}>
          <Skill>UML</Skill>
          <Skill>SAP</Skill>
          <Skill>Bizagi BPMN Modeler</Skill>
        </SkillSet>
      </div>
    </>
  );
}

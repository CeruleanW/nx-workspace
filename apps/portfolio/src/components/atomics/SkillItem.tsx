import {
  Typography,
  ListItem,
} from '@material-ui/core';
import styles from '../../styles/components/components.module.scss';
import styled from 'styled-components';

const Li = styled.li`
    margin-right: 1rem;
    margin-bottom: 1rem;
    padding: 0.5rem;
    border-radius: 18px;
    /* border: 2px solid #d0dbec; */
    display: flex;
`;

const Span = styled.span`
  padding: 0rem 0.5rem;
`;

export const SimpleSkill = (props) => {
  return (
    <ListItem>
      <Typography>
        <span style={{ color: 'cadetblue', marginRight: '6px' }}>●</span>
        {props.children}
      </Typography>
    </ListItem>
  );
};

export const Skill = (props) => {
  return <Li className={`${styles['skill-item']} rounded-xl`}><Span>{props.children}</Span></Li>;
};

export const ExpandableSkill = (props) => {
  return <SimpleSkill>{props.children}</SimpleSkill>;
};

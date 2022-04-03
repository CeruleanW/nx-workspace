import React from 'react';
import { Card, Text } from '@nextui-org/react';

export default function SkillItem(props) {
  return (
    <Card
      shadow={false}
      css={{
        width: 'auto',
        height: 'auto',
        margin: '$2',
        backgroundColor: '$gray300',
        color: '$gray900',
        fontWeights: '$black',
      }}
    >
      <Text span size='0.85rem' weight='medium'>
        {props.children}
      </Text>
    </Card>
  );
}

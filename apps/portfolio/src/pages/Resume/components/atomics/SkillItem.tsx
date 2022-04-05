import { Card, Text, Container } from '@nextui-org/react';

export default function SkillItem(props) {
  const {color = '$gray900', bgColor='$gray300'} = props;
  return (
    <Container
      css={{
        width: 'auto',
        height: 'auto',
        margin: '$2',
        backgroundColor: bgColor,
        color: color,
        fontWeights: '$black',
        padding: '$3',
        borderRadius: '$sm'
      }}
    >
      <Text span size='0.85rem' weight='medium'>
        {props.children}
      </Text>
    </Container>
  );
}

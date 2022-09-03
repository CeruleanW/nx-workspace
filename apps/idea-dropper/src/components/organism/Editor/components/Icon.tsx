import React, { Ref, PropsWithChildren } from 'react';
import styled from 'styled-components';
import { BaseProps, OrNull } from './Button';

const StyledIcon = styled.span`
  font-size: 18px;
  vertical-align: text-bottom;
`;

export const Icon = React.forwardRef(
  (
    { className, ...props }: PropsWithChildren<BaseProps>,
    ref: Ref<OrNull<HTMLSpanElement>>
  ) => (
    <StyledIcon
      {...props}
      ref={ref}
      className={`material-icons ${className}`} />
  )
);

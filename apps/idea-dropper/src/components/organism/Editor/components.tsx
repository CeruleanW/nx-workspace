import React, { Ref, PropsWithChildren } from 'react'
import styled from 'styled-components';

const StyledBtn = styled.span<{ reversed, active }>`
  cursor: pointer;
      color: ${props => props.reversed
    ? props.active
      ? 'white'
      : '#aaa'
    : props.active
      ? 'black'
      : '#ccc'
  };`;

interface BaseProps {
  className: string
  [key: string]: unknown
}
type OrNull<T> = T | null

export const Button = React.forwardRef(
  (
    {
      className,
      active,
      reversed,
      ...props
    }: PropsWithChildren<
      {
        active: boolean
        reversed: boolean
      } & BaseProps
    >,
    ref: Ref<OrNull<HTMLSpanElement>>
  ) => (
    <StyledBtn
      {...props}
      ref={ref}
      className={className}
      reversed={reversed}
      active={active}
    />
  )
)


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
      className={`material-icons ${className}`}
    />
  )
);


const StyledMenu = styled.div`
        & > * {
          display: inline-block;
        }
        & > * + * {
          margin-left: 15px;
        }
`;
export const Menu = React.forwardRef(
  (
    { className, ...props }: PropsWithChildren<BaseProps>,
    ref: Ref<OrNull<HTMLDivElement>>
  ) => (
    <StyledMenu
      {...props}
      ref={ref}
      className={`${className}`}
    />
  )
)


const StyledToolbar = styled(Menu)`
  position: relative;
  padding: 1px 18px 17px;
  border-bottom: 2px solid #eee;
  margin-top: 20px;
  margin-bottom: 20px;
  max-width: 100%;
`;

export const ToolbarContainer = React.forwardRef(
  (
    { className, ...props }: PropsWithChildren<BaseProps>,
    ref: Ref<OrNull<HTMLDivElement>>
  ) => (
    <StyledToolbar
      {...props}
      ref={ref}
      className={`${className}`}
    />
  )
)


import React, { ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { BusyAnimation } from '../animations/busy-animation';
import { theme } from '../theme';

export type ButtonProps = {
  loading?: boolean;
} & React.HTMLProps<HTMLButtonElement>;

export const ButtonBase = styled.button<ButtonProps>`
  flex: 0 0;
  display: flex;
  align-items: center;
  align-content: center;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: center;
  font-size: 1.4rem;
  border: 1px solid #cc2b5e;
  border-radius: ${theme.radiusMedium};
  font-size: 1rem;
  padding: 0.6rem 1rem;
  margin: 0;
  gap: 0.5rem;
  cursor: pointer;
  box-sizing: border-box;
  transition: all .3s cubic-bezier(.05, .03, .35, 1);
  user-select: none;
  touch-action: manipulation;
  min-width: fit-content;
  opacity: 1;

  > * {
    flex: 1 0;
  }

  > svg {
    flex: 0;
    font-size: 1.4rem;
    box-sizing: content-box;
    min-width: 1.2rem;
    height: auto;
  }

  :hover {
    //opacity: .9;
  }

  :focus-visible {
    outline-color: #feac13;
    outline-width: 2px;
    outline-style: solid;
  }

  :disabled {
    cursor: auto;
    color: #ababab;
    background: transparent;
  }

  ${({ loading }) => loading ? css`animation: ${BusyAnimation} 1s infinite;` : ``}
`;
export const Button = styled(ButtonBase)`
  box-shadow: ${theme.elevation1};
  background: linear-gradient(115deg, #753a88, #cc2b5e);
  color: white;

  :hover {
    box-shadow: ${theme.elevation2};
    background:
      linear-gradient(115deg, #feac1318, #feac1336),
      linear-gradient(115deg, #753a88, #cc2b5e);
  }

  :active {
    background:
      linear-gradient(115deg, #feac1328, #feac1346),
      linear-gradient(115deg, #753a88, #cc2b5e);
  }

  :disabled {
    cursor: auto;
    color: #ababab;
    background: transparent;
  }
`;
export const IconButton = styled(ButtonBase)`
  border-radius: 50%;
  min-width: 2.5rem;
  min-height: 2.5rem;
  padding: 0.5rem;
  margin: 0;
  border: none;
  background: transparent;
  color: #753a88;

  > svg {
    flex: 1 1;
    width: 100%;
    height: auto;
    box-sizing: content-box;
  }

  :hover {
    color: #cc2b5e;
    background: #00000019;
  }

  :active {
    background: #cc2b5e19;
  }

  :disabled {
    cursor: auto;
    color: #ababab;
    background: transparent;
  }
`;
export const SubmitButton = styled(ButtonBase)``;

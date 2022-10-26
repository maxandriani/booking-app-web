import React from 'react';
import styled, { css } from 'styled-components';
import { BusyAnimation } from '../animations/busy-animation';

function isLoading(loading?: boolean) {
  if (loading === true) return css`
    animation: ${BusyAnimation} 1s infinite;
  `;
}

export type ButtonProps = {
  loading?: boolean;
} & React.HTMLProps<HTMLButtonElement>;

export const ButtonBase = styled.button<ButtonProps>(({ theme, loading }) => css`
  flex: 0 0;
  display: flex;
  align-items: center;
  align-content: center;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: center;
  font-size: 1.4rem;
  border: none;
  border-radius: ${theme.border.radius.medium};
  font-size: 1rem;
  padding: 0.6rem 1rem;
  margin: 0;
  gap: 0.5rem;
  cursor: pointer;
  box-sizing: border-box;
  transition: all ${theme.transitions.calm};
  user-select: none;
  touch-action: manipulation;
  min-width: fit-content;
  opacity: 1;
  color: ${theme.text.interactive};
  background: transparent;

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
    color: ${theme.text.highlight};
  }

  :focus-visible {
    outline-color: ${theme.border.focusVisible};
  }

  :disabled {
    cursor: auto;
    color: ${theme.text.muted};
  }
  ${isLoading(loading)}
`);
export const Button = styled(ButtonBase)<ButtonProps>(({theme}) => css`
  color: ${theme.button.default.color};
  border: ${theme.button.default.border};
  background: ${theme.button.default.background};
  box-shadow: ${theme.elevations.elevation1};

  :hover {
    color: ${theme.button.hover.color};
    border: ${theme.button.hover.border};
    background: ${theme.button.hover.background};
    box-shadow: ${theme.elevations.elevation2};
  }

  :active {
    color: ${theme.button.active.color};
    border: ${theme.button.active.border};
    background: ${theme.button.active.background};
    box-shadow: ${theme.elevations.elevation2};
  }

  :disabled {
    cursor: auto;
    color: ${theme.button.disabled.color};
    border: ${theme.button.disabled.border};
    background: ${theme.button.disabled.background};
    box-shadow: none;
  }
`);
export const IconButton = styled(ButtonBase)<ButtonProps>(({theme}) => css`
  border-radius: 50%;
  min-width: 2.5rem;
  min-height: 2.5rem;
  padding: 0.5rem;
  margin: 0;

  color: ${theme.iconButton.default.color};
  border: ${theme.iconButton.default.border};
  background: ${theme.iconButton.default.background};
  box-shadow: none;

  > svg {
    flex: 1 1;
    width: 100%;
    height: auto;
    box-sizing: content-box;
  }

  :hover {
    color: ${theme.iconButton.hover.color};
    border: ${theme.iconButton.hover.border};
    background: ${theme.iconButton.hover.background};
    box-shadow: none;
  }

  :active {
    color: ${theme.iconButton.active.color};
    border: ${theme.iconButton.active.border};
    background: ${theme.iconButton.active.background};
    box-shadow: none;
  }

  :disabled {
    cursor: auto;
    color: ${theme.iconButton.disabled.color};
    border: ${theme.iconButton.disabled.border};
    background: ${theme.iconButton.disabled.background};
    box-shadow: none;
  }
`);

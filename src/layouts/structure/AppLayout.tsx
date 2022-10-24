import React, { ReactNode } from 'react';
import { createGlobalStyle, css } from 'styled-components';

const GlobalStyles = createGlobalStyle(({theme}) => css`
  body {
    background: ${theme.surface.background};
    color: ${theme.text.normal};
    font-family: ${theme.fonts.body.family};
    font-weight: ${theme.fonts.body.weight};
    font-size: ${theme.fonts.body.size};
    line-height: ${theme.fonts.body.height};
  }

  strong {
    font-weight: ${theme.fonts.emphasis.weight};
  }

  input, button, a, select, textarea {
    :focus-visible {
      outline: ${theme.border.focusVisible};
    }
  }
`);

export type AppLayoutProps = {
  children?: ReactNode;
  className?: string;
}

function AppLayout({children}: AppLayoutProps) {
  
  return (
    <>
      <GlobalStyles />
      {children}
    </>
  );
}

AppLayout.displayName = 'AppLayout'
export default AppLayout;
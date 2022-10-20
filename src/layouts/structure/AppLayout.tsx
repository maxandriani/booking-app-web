import React, { ReactNode } from 'react';
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    background: #f3f3f3;
  }

  input, button, a {
    :focus-visible {
      outline-color: #feac13;
      outline-width: 2px;
      outline-style: solid;
    }
  }
`;

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
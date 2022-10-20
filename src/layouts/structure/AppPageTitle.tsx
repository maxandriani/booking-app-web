import React from 'react';
import styled from 'styled-components';

export type AppPageTitleProps = {
  className?: string;
}

const AppPageTitle = styled.h1`
  color: #cc2b5e;
  color: linear-gradient(115deg, #753a88, #cc2b5e);
  padding: 0;
  margin: 0;
  font-weight: 300;
  font-size: 2rem;
  min-height: 3rem;
`;

AppPageTitle.displayName = 'AppPageTitle'
export default AppPageTitle;
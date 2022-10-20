import React, { ReactNode } from 'react';
import styled from 'styled-components';

const AppContent = styled.article`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
`;

AppContent.displayName = 'AppContent'
export default AppContent;
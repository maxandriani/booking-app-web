import styled from 'styled-components';
import AppPageTitle from './AppPageTitle';

const AppHeader = styled.header`
  display: flex;
  margin: 0 0 1rem 0;
  min-height: 4rem;
  background: #00000009;
  align-items: center;

  padding: 1rem;

  ${AppPageTitle} {
    margin: 0;
    padding: 0;
  }
`;

AppHeader.displayName = 'AppHeader'
export default AppHeader;
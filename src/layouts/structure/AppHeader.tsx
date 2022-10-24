import styled, { css } from 'styled-components';
import AppPageTitle from './AppPageTitle';

const AppHeader = styled.header(({theme}) => css`
  display: flex;
  margin: 0 0 1rem 0;
  min-height: 4rem;
  background: ${theme.surface.header};
  align-items: center;

  padding: 1rem;

  ${AppPageTitle} {
    margin: 0;
    padding: 0;
  }
`);

AppHeader.displayName = 'AppHeader'
export default AppHeader;
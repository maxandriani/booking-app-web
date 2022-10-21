import styled, { css } from 'styled-components';

export type AppPageTitleProps = {
  className?: string;
}

const AppPageTitle = styled.h1(({theme}) => css`
  color: ${theme.text.title};
  padding: 0;
  margin: 0;
  font-family: ${theme.fonts.heading.family};
  font-weight: 300;
  font-size: 2rem;
  min-height: 3rem;
`);

AppPageTitle.displayName = 'AppPageTitle'
export default AppPageTitle;
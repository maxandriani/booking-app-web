import styled, { StyledComponent } from "styled-components";

export const Title = styled.h1`
  color: #cc2b5e;
  font-size: 1.2rem;
  font-weight: 600;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
`;
export const H1 = styled(Title)`
  font-size: 1.4rem;
  font-weight: 300;
  margin-top: 0;
`;
export const H2 = styled(Title).attrs({ as: 'h2' })`
` as StyledComponent<"h2", any, {}, never>;
export const H3 = styled(Title).attrs({ as: 'h3' })`
` as StyledComponent<"h3", any, {}, never>;
export const H4 = styled(Title).attrs({ as: 'h4' })`
` as StyledComponent<"h4", any, {}, never>;
export const H5 = styled(Title).attrs({ as: 'h5' })`
` as StyledComponent<"h5", any, {}, never>;
export const H6 = styled(Title).attrs({ as: 'h6' })`
` as StyledComponent<"h6", any, {}, never>;

export const Label = styled.span`
  color: #2d2d2d;
`;
export const Text = styled(Label).attrs({ as: 'p' })`
  margin-bottom: 0.5rem;

  :last-child {
    margin-bottom: 0;
  }
` as StyledComponent<"p", any, {}, never>;
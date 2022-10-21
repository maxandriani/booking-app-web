import { css } from "styled-components";

export const paperStyle = css(({theme}) => css`
  background: white;
  padding: 1rem;
  box-shadow: ${theme.elevations.elevation1};
`);

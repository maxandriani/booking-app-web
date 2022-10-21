import styled, { css } from "styled-components";

export const dividerStyle = css(({ theme }) => css`
  display: block;
  background: ${theme.surface.divider};
  margin: 0.25rem 0;
`);

export const VerticalDivider = styled.div`
  ${dividerStyle}
  width: 1px;
  height: auto;
  max-height: 90%;
`;
export const HorizontalDivider = styled.div`
  ${dividerStyle}
  width: auto;
  max-width: 90%;
  height: 1px;
`;
import styled, { css } from "styled-components";

export const titleBaseStyle = css(({ theme }) => css`
  color: ${theme.text.title};
  font-size: ${theme.fonts.heading.size};
  font-weight: ${theme.fonts.heading.weight};
  line-height: ${theme.fonts.heading.height};
  font-family: ${theme.fonts.heading.family};
`);

export const titleStyle = css(({ theme }) => css`
  ${titleBaseStyle}
  margin-top: 1rem;
  margin-bottom: 0.5rem;
`);

export const labelStyle = css(({ theme }) => css`
  color: ${theme.text.label};
`);

export const textStyle = css(({ theme }) => css`
  color: ${theme.text.normal};
  margin-bottom: 0.5rem;

  :last-child {
    margin-bottom: 0;
  }
`);

export const Title = styled.h1`
  ${titleStyle}
  margin-top: 0;
`;
export const H2 = styled.h2`
  ${titleStyle}
`;
export const H3 = styled.h3`
  ${titleStyle}
`;
export const H4 = styled.h4`
  ${titleStyle}
`;
export const H5 = styled.h5`
  ${titleStyle}
`;
export const H6 = styled.h6`
  ${titleStyle}
`;

export const Label = styled.span`${labelStyle}`;
export const Text = styled.p`${textStyle}`;
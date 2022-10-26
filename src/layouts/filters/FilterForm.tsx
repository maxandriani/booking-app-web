import styled, { css } from "styled-components";
import { paperStyle } from "../crafts/Paper";
import { InputBase } from "../inputs/Inputs";

export const FilterForm = styled.form(({ theme }) => {
  return css`
  ${paperStyle}
  flex: 1;
  display: flex;
  gap: 0.5rem;
  padding: 0.5rem;
  box-shadow:  ${theme.elevations.elevation2};
  border-radius: ${theme.border.radius.small};

  ${InputBase} {
    flex: 1 1;
    min-width: 80px;
    width: 100%;
    max-width: none;
  }
`;
});
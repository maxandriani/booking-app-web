import styled, { css } from "styled-components";
import { paperStyle } from "../crafts/Paper";

export const FilterForm = styled.form(({ theme }) => css`
  ${paperStyle}
  display: flex;
  gap: 0.5rem;
  padding: 0.5rem;
  box-shadow:  ${theme.elevations.elevation2};
  border-radius: ${theme.border.radius.small};
`);
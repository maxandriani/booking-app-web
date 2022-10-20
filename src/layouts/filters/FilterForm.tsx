import styled from "styled-components";
import { theme } from "../theme";

export const FilterForm = styled.form`
  display: flex;
  gap: 0.5rem;
  padding: 0.5rem;
  background: ${theme.paperBg};
  box-shadow:  ${theme.elevation2};
  border-radius: ${theme.radiusSmall};
`;
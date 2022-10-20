import styled, { StyledComponent } from "styled-components";
import { Card, CardActions, CardContent } from "../cards/Card";
import { Paper } from "../crafts/Paper";
import { Label } from "../crafts/Text";
import { theme } from "../theme";

export const InputBase = styled.input`
  background: #ededed;
  border-radius: ${theme.radiusMedium};
  // border: 1px solid #d9d9d9;
  border: none;
  padding: 0.2rem 0.8rem;
  margin: 0;
  font-size: 1rem;
`;

export const Input = styled(InputBase)`
  min-height: 2rem;

  :focus {
    box-shadow: ${theme.elevation3};
  }
`;

export const FormField = styled.label`
  display: flex;
  flex-direction: column;
  max-width: 460px;
  gap: .2rem;

  ${Label} {
    margin: 0 0 0.2rem 0.7rem;
    color: #797979;
    font-size: 0.8rem;
  }
`;
export const FormCard = styled(Card).attrs({ as: 'form' })`

` as StyledComponent<"form", any, {}, never>;

export const FormCardSection = styled(CardContent).attrs({ as: 'fieldset' })`
  display: flex;
  flex-direction: column;
  border: none;
  padding: 1.5rem 1rem;
  gap: 1rem;
` as StyledComponent<"fieldset", any, {}, never>;

export const FormCardActions = styled(CardContent)`
  padding: 1rem;
`;
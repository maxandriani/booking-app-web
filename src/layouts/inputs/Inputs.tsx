import styled, { css } from "styled-components";
import { paperStyle } from "../crafts/Paper";
import { Label } from "../crafts/Text";

export const InputBase = styled.input(({theme}) => css`
  background: ${theme.surface.input};
  border-radius: ${theme.border.radius.medium};
  border: none;
  padding: 0.2rem 0.8rem;
  margin: 0;
  font-size: 1rem;
  flex: 1 0 0;
  width: 100%;
  min-width: 20%;
  max-width: 100%;
  display: flex;
  
  &[type="date"] {
    flex: 1 0 0;
  }
`);

export const Input = styled(InputBase)(({theme}) => css`
  min-height: 2rem;

  :focus {
    box-shadow: ${theme.elevations.elevation3};
  }
`);

export const TextArea = styled.textarea(({theme}) => css`
  background: ${theme.surface.input};
  border-radius: ${theme.border.radius.medium};
  border: none;
  padding: 0.2rem 0.8rem;
  margin: 0;
  font-size: 1rem;
  min-height: 4rem;
  height: auto;
  resize: vertical;
`)

export const Select = styled.select(({theme}) => css`
  background: ${theme.surface.input};
  border-radius: ${theme.border.radius.medium};
  box-sizing: content-box;
  border: none;
  padding: 0.2rem 0.8rem;
  margin: 0;
  font-size: 1rem;
`);

export const Option = styled.option`
  padding: 0.2rem 0.8rem;
`;

export const InputGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const FormField = styled.label(({theme}) => css`
  display: flex;
  flex-direction: column;
  max-width: 460px;
  gap: .2rem;

  ${Label} {
    margin: 0 0 0.2rem 0.7rem;
    color: ${theme.text.label};
    font-size: 0.8rem;
  }
`);
export const FormCard = styled.form(({theme}) => css`
  ${paperStyle}
  display: flex;
  flex-direction: column;
  border-radius: ${theme.border.radius.minimal};
  padding: 0;
`);

export const FormCardSection = styled.fieldset`
  display: flex;
  flex-direction: column;
  border: none;
  padding: 1.5rem 1rem;
  gap: 1rem;
  align-items: flex-start;
`;

export const FormCardActions = styled.div`
  display: flex;
  gap: 0.5rem;
  align-content: flex-start;
  padding: 1rem;
`;

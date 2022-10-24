import styled, { css } from "styled-components";
import { Label } from "../crafts/Text";

export const List = styled.ul(({ theme }) => css`
  list-style: none;
  margin: 0;
  padding: 0;
`);

export const ListItem = styled.li(({theme}) => css`
  padding: 0.6rem 1rem;
  border-bottom: 1px solid ${theme.surface.hover};
  align-content: center;
  align-items: center;

  :hover {
    background: ${theme.surface.hover}
  }
`);

export const ListKeyValueItem = styled(ListItem)(({ theme }) => css`
  flex: 1 0;
  display: flex;
  gap: 0.5rem;

  :hover {
    box-shadow: none;
  }

  > * {
    flex: 0;
  }

  ${Label} {
    flex: 1;
  }

  ${Label}:first-child {
    min-width: 80px;
    max-width: 30%;
    color: ${theme.text.normal}
  }
`);

export const CardList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1rem;
`;

export const CardListItem = styled.li(({ theme }) => css`
  flex: 1 0;

  :hover {
    box-shadow: ${theme.elevations.elevation2};
  }
`);
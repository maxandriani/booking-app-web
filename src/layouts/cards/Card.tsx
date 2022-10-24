import styled, { css } from "styled-components";
import { Button } from "../buttons/Button";
import { paperStyle } from "../crafts/Paper";
import { titleStyle, labelStyle } from "../crafts/Text";

export const CardTitle = styled.h1`
  ${titleStyle}
  padding: 0;
  margin: 0;
`;

export const CardDescription = styled.span`
  ${labelStyle}
  padding: 0;
  margin: 0;
  font-size: 0.9rem;
`;

export const Card = styled.section(({ theme }) => css`
  ${paperStyle}
  display: flex;
  flex-direction: column;
  border-radius: ${theme.border.radius.minimal};
  padding: 0;
`);
export const CardHeader = styled.header`
    display: grid;
    grid-template:
      "avatar title action"
      "avatar description action";
    padding: 1rem;
    justify-items: start;
    align-items: center;
    justify-content: start;
    align-content: center;

  ${CardTitle} {
    grid-area: title;
  }

  ${CardDescription} {
    grid-area: description;
  }
`;
export const CardContent = styled.div``;
export const CardActions = styled.div(({theme}) => css`
  border-top: 1px solid #f3f3f3;
  display: flex;

  ${Button} {
    background: transparent;
    border: none;
    box-shadow: none;
    color: ${theme.text.interactive};
    border-radius: 0;

    :first-child {
      border-bottom-left-radius: ${theme.border.radius.minimal};
    }

    :last-child {
      border-bottom-right-radius: ${theme.border.radius.minimal};
    }

    :hover {
      color: ${theme.text.interactiveActive};
      background: ${theme.surface.hover};
      border: none;
    }

    :active {
      color: ${theme.text.interactiveActive};
      background: ${theme.surface.active};
      border: none;
    }

    :disabled {
      cursor: auto;
      color: ${theme.text.muted};
      background: transparent;
      border: none;
    }
  }
`);

import styled from "styled-components";
import { Button } from "../buttons/Button";
import { Paper } from "../crafts/Paper";
import { Title } from "../crafts/Text";
import { theme } from "../theme";

export const CardTitle = styled(Title)`
  padding: 0;
  margin: 0;
`;

export const CardDescription = styled.span`
  padding: 0;
  margin: 0;
  font-size: 0.9rem;
`;

export const Card = styled(Paper)`
  display: flex;
  flex-direction: column;
  border-radius: ${theme.radiusMinimal};
  padding: 0;

`;
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
export const CardActions = styled.div`
  border-top: 1px solid #f3f3f3;
  display: flex;

  ${Button} {
    background: transparent;
    border: none;
    box-shadow: none;
    color: #753a88;
    border-radius: 0;

    :first-child {
      border-bottom-left-radius: ${theme.radiusMinimal};
    }

    :last-child {
      border-bottom-right-radius: ${theme.radiusMinimal};
    }

    :hover {
      color: #cc2b5e;
      background: #00000019;
    }

    :active {
      background: #cc2b5e19;
    }

    :disabled {
      cursor: auto;
      color: #ababab;
      background: transparent;
    }
  }
`;

import styled from "styled-components";

export const Divider = styled.div`
  display: block;
  background: #d3d3d3;
  margin: 0.25rem 0;
`;
export const VerticalDivider = styled(Divider)`
  width: 1px;
  height: auto;
  max-height: 90%;
`;
export const HorizontalDivider = styled(Divider)`
  width: auto;
  max-width: 90%;
  height: 1px;
`;
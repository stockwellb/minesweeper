import React from "react";
import styled from "styled-components";

const DEFAULT = 0;
const MARKED = 1;
const REVEALED = 2;

const StyledBaseCell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid gray;
  margin: 1px;
  height: 2em;
  width: 2em;
`;

const StyledDefaultCell = styled(StyledBaseCell)`
  background-color: gray;
`;

const StyledBombCell = styled(StyledBaseCell)`
  background-color: red;
`;

const StyledNeighborText = styled.p`
  font-size: 1em;
  font-weight: bolder;
  text-align: center;
  color: ${props =>
    props.neighbors === 1
      ? "blue"
      : props.neighbors === 2
        ? "green"
        : props.neighbors === 3
          ? "red"
          : "black"};
`;

const Cell = ({ mode, neighbors, isBomb }) => {
  if (isBomb && mode === REVEALED) {
    return <StyledBombCell />;
  } else {
    switch (mode) {
      case DEFAULT:
        return <StyledDefaultCell />;
      case MARKED:
        return <StyledDefaultCell>x</StyledDefaultCell>;
      default:
        return (
          <StyledBaseCell>
            <StyledNeighborText neighbors={neighbors}>
              {neighbors}
            </StyledNeighborText>
          </StyledBaseCell>
        );
    }
  }
};

export default Cell;

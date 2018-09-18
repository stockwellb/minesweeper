import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBomb } from "@fortawesome/free-solid-svg-icons";
import { faBug } from "@fortawesome/free-solid-svg-icons";
import { faFlag } from "@fortawesome/free-solid-svg-icons";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { cellStates } from "../../minefield";

const StyledBaseCell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #d3d3d3;
  margin: 1px;
  height: 2em;
  width: 2em;
`;

const StyledDefaultCell = styled(StyledBaseCell)`
  background-color: #d3d3d3;
`;

const StyledEmptyCell = styled(StyledBaseCell)``;

const StyledBombCell = styled(StyledBaseCell)`
  color: black;
`;

const StyledFlaggedCell = styled(StyledBaseCell)`
  background-color: #d3d3d3;
  color: red;
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

const Cell = ({ state, onFlagged, onSelected }) => {
  switch (state) {
    case cellStates.HIDDEN:
      return (
        <StyledDefaultCell onClick={onSelected} onContextMenu={onFlagged} />
      );
    case cellStates.EMPTY:
      return <StyledEmptyCell />;
    case cellStates.MINE:
      return (
        <StyledBombCell>
          <FontAwesomeIcon icon={faBomb} />
        </StyledBombCell>
      );
    case cellStates.EXPLODED_MINE:
      return (
        <StyledBombCell>
          <FontAwesomeIcon icon={faBug} />
        </StyledBombCell>
      );
    case cellStates.MARKED_MINE:
      return (
        <StyledFlaggedCell onContextMenu={onFlagged}>
          <FontAwesomeIcon icon={faFlag} />
        </StyledFlaggedCell>
      );
    case cellStates.MARKED_INCORRECT:
      return (
        <StyledFlaggedCell onContextMenu={onFlagged}>
          <FontAwesomeIcon icon={faFlag} />
        </StyledFlaggedCell>
      );
    case cellStates.MARKED_QUESTION:
      return (
        <StyledFlaggedCell onContextMenu={onFlagged}>
          <FontAwesomeIcon icon={faQuestion} />
        </StyledFlaggedCell>
      );
    case cellStates.zero:
      return <StyledEmptyCell />;
    case cellStates.one:
      return (
        <StyledBaseCell>
          <StyledNeighborText neighbors={1}>1</StyledNeighborText>
        </StyledBaseCell>
      );
    case cellStates.two:
      return (
        <StyledBaseCell>
          <StyledNeighborText neighbors={2}>2</StyledNeighborText>
        </StyledBaseCell>
      );
    case cellStates.three:
      return (
        <StyledBaseCell>
          <StyledNeighborText neighbors={3}>3</StyledNeighborText>
        </StyledBaseCell>
      );
    case cellStates.four:
      return (
        <StyledBaseCell>
          <StyledNeighborText neighbors={4}>4</StyledNeighborText>
        </StyledBaseCell>
      );
    case cellStates.five:
      return (
        <StyledBaseCell>
          <StyledNeighborText neighbors={5}>5</StyledNeighborText>
        </StyledBaseCell>
      );
    case cellStates.six:
      return (
        <StyledBaseCell>
          <StyledNeighborText neighbors={6}>6</StyledNeighborText>
        </StyledBaseCell>
      );
    case cellStates.seven:
      return (
        <StyledBaseCell>
          <StyledNeighborText neighbors={7}>7</StyledNeighborText>
        </StyledBaseCell>
      );
    case cellStates.eight:
      return (
        <StyledBaseCell>
          <StyledNeighborText neighbors={8}>8</StyledNeighborText>
        </StyledBaseCell>
      );
    default:
      return <StyledEmptyCell />;
  }
};

export default Cell;

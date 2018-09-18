import React from "react";
import styled from "styled-components";
import Cell from "../Cell";

const StyledRow = styled.div`
  display: flex;
`;

const GameBoard = ({ rows, onFlagged, onSelected }) => {
  return (
    <div>
      {rows.map((row, index) => (
        <StyledRow key={index}>
          {row.map(cell => (
            <Cell
              key={cell.id}
              state={cell.state}
              onFlagged={onFlagged(cell.x, cell.y)}
              onSelected={onSelected(cell.x, cell.y)}
            />
          ))}
        </StyledRow>
      ))}
    </div>
  );
};

export default GameBoard;

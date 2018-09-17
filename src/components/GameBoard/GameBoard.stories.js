import React from "react";
import { storiesOf } from "@storybook/react";
import GameBoard from "./index";

const rows = [
  [
    { id: 0, isBomb: false, neighbors: 2, mode: 0 },
    { id: 1, isBomb: false, neighbors: 2, mode: 2 },
    { id: 2, isBomb: false, neighbors: 0, mode: 2 }
  ],
  [
    { id: 3, isBomb: false, neighbors: 2, mode: 0 },
    { id: 4, isBomb: false, neighbors: 2, mode: 1 },
    { id: 5, isBomb: false, neighbors: 2, mode: 2 }
  ],
  [
    { id: 6, isBomb: false, neighbors: 2, mode: 1 },
    { id: 7, isBomb: false, neighbors: 2, mode: 0 },
    { id: 8, isBomb: true, neighbors: 2, mode: 0 }
  ]
];

storiesOf("GameBoard", module).add("Default", () => <GameBoard rows={rows} />);

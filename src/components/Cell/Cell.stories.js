import React from "react";

import { storiesOf } from "@storybook/react";

import Cell from "./index";

storiesOf("Cell", module)
  .add("Default", () => <Cell mode={0} isBomb={true} neighbors={1} />)
  .add("Marked", () => <Cell mode={1} isBomb={false} neighbors={1} />)
  .add("Neighbors", () => (
    <div>
      <Cell mode={2} isBomb={false} neighbors={1} />
      <Cell mode={2} isBomb={false} neighbors={2} />
      <Cell mode={2} isBomb={false} neighbors={3} />
      <Cell mode={2} isBomb={false} neighbors={4} />
    </div>
  ))
  .add("Bomb", () => <Cell mode={2} isBomb={true} neighbors={0} />);

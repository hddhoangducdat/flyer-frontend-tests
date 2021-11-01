import React, { ChangeEventHandler, useEffect, useState } from "react";
import { useStore } from "../questions/ImproveArrayRender/Content";

function PositionItem({
  x,
  y,
  index,
}: //   onXInputChange,
//   onYInputChange,
{
  x: number;
  y: number;
  index: number;
  //   onXInputChange: ChangeEventHandler<HTMLInputElement>;
  //   onYInputChange: ChangeEventHandler<HTMLInputElement>;
}) {
  const [posX, setPosX] = useState(x);
  const [posY, setPosY] = useState(y);
  const changeBox = useStore(({ changeBox }) => changeBox);

  return (
    <li style={{ marginBottom: 15 }}>
      Box {index + 1} - x:{" "}
      <input
        type="text"
        size={4}
        value={posX}
        onChange={({ target: { value } }) => {
          setPosX(parseInt(value) | 0);
          changeBox(index, { x: posX, y: posY });
        }}
      />
      , y:{" "}
      <input
        type="text"
        size={4}
        value={posY}
        onChange={({ target: { value } }) => {
          setPosY(parseInt(value) | 0);
          changeBox(index, { x: posX, y: posY });
        }}
      />
    </li>
  );
}
export default React.memo(PositionItem);

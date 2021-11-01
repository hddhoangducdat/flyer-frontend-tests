import { useRef, useCallback } from "react";
import Draggable, { DraggableProps } from "react-draggable";
import create from "zustand";
import styles from "./index.module.css";
import shallow from "zustand/shallow";
import React from "react";

const BOXES_COUNT = 10;
const BOXES_PER_ROW = 5;

type Store = {
  positions: Array<{ x: number; y: number }>;
  sizes: Array<{ width: number; height: number }>;
  changePosition: (index: number, position: { x: number; y: number }) => void;
  addBox: () => void;
  removeBox: (index: number) => void;
  resizeBox: (index: number, size: { width: number; height: number }) => void;
};

export const useStore = create<Store>((set) => ({
  positions: Array.from({ length: BOXES_COUNT }).map((_, index) => ({
    x: 100 + (150 + 100) * (index % BOXES_PER_ROW),
    y: 20 + (150 + 50) * Math.floor(index / BOXES_PER_ROW),
  })),
  sizes: Array.from({ length: BOXES_COUNT }).map((_, index) => ({
    width: 150,
    height: 150,
  })),
  changePosition: (index: number, position: { x: number; y: number }) =>
    set(({ positions }) => {
      return {
        positions: positions.map((value, i) => {
          return i !== index ? value : position;
        }),
      };
    }),
  addBox: () =>
    set(({ positions, sizes }) => ({
      positions: [...positions, { x: 0, y: 0 }],
      sizes: [...sizes, { width: 150, height: 150 }],
    })),
  removeBox: (index: number) =>
    set(({ positions, sizes }) => ({
      positions: positions.filter((_, i) => index !== i),
      sizes: sizes.filter((_, i) => index !== i),
    })),
  resizeBox: (index: number, size: { width: number; height: number }) =>
    set(({ sizes }) => ({
      sizes: sizes.map((value, i) => {
        return i !== index ? value : size;
      }),
    })),
}));

const BoxItem = React.memo(function BoxItem({
  index,
  text,
  ...rest
}: Partial<DraggableProps> & {
  index: number;
  text: string | number;
}) {
  const nodeRef = useRef(null);
  const changePosition = useStore(({ changePosition }) => changePosition);
  const position = useStore(
    useCallback(({ positions }) => positions[index], [index])
  );
  const { width, height } = useStore(
    useCallback(
      ({ sizes }) => ({
        ...sizes[index],
      }),
      [index]
    ),
    shallow
  );

  return (
    <Draggable
      nodeRef={nodeRef}
      position={position}
      onDrag={(_, { x, y }) => {
        changePosition(index, { x, y });
      }}
      {...rest}
    >
      <div
        style={{ width: `${width}px`, height: `${height}px` }}
        className={styles.Box}
        ref={nodeRef}
      >
        Box {text}
      </div>
    </Draggable>
  );
});

const PositionItem = React.memo(function PositionItem({
  x,
  y,
  width,
  height,
  index,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  index: number;
}) {
  const { removeBox, resizeBox, changePosition } = useStore(
    ({ resizeBox, removeBox, changePosition }) => ({
      changePosition,
      removeBox,
      resizeBox,
    }),
    shallow
  );

  return (
    <li
      style={{
        paddingBottom: 30,
        paddingTop: 30,
        textAlign: "center",
        borderBottom: "1px solid #9b9ead",
      }}
    >
      <table className={styles.Table}>
        <tr>
          <td> Box {index + 1} </td>
          <td className={styles.Button} onClick={() => removeBox(index)}>
            Remove
          </td>
        </tr>
        <tr>
          <th>x</th>
          <th>y</th>
        </tr>
        <tr>
          <td>
            <input
              type="text"
              size={4}
              value={x}
              onChange={({ target: { value } }) =>
                changePosition(index, { x: parseInt(value) | 0, y })
              }
            />
          </td>
          <td>
            <input
              type="text"
              size={4}
              value={y}
              onChange={({ target: { value } }) =>
                changePosition(index, { x, y: parseInt(value) | 0 })
              }
            />
          </td>
        </tr>
        <tr>
          <th>Width</th>
          <th>Height</th>
        </tr>
        <tr>
          <td>
            <input
              type="text"
              size={4}
              value={width}
              onChange={({ target: { value } }) =>
                resizeBox(index, { width: parseInt(value) | 0, height })
              }
            />
          </td>
          <td>
            <input
              type="text"
              size={4}
              value={height}
              onChange={({ target: { value } }) =>
                resizeBox(index, {
                  width,
                  height: parseInt(value) | 0,
                })
              }
            />
          </td>
        </tr>
      </table>
    </li>
  );
});

function Content() {
  const { addBox } = useStore(
    ({ addBox }) => ({
      addBox,
    }),
    shallow
  );

  const sizes = useStore(({ sizes }) => sizes, shallow);
  const positions = useStore(({ positions }) => positions, shallow);

  return (
    <div className={styles.Content}>
      <div className={styles.Slider}>
        <div className={styles.Button} onClick={() => addBox()}>
          Add Box
        </div>
        <ul className="p-4">
          {positions.map(({ x, y }, index) => {
            return (
              <PositionItem
                key={index}
                x={x}
                y={y}
                width={sizes[index].width}
                height={sizes[index].height}
                index={index}
              />
            );
          })}
        </ul>
      </div>
      <div className={styles.Main}>
        {Array.from({ length: positions.length }).map((_, index) => {
          return (
            <BoxItem
              key={index}
              index={index}
              bounds="parent"
              text={index + 1}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Content;

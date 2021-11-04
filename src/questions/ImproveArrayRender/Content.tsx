import { useRef, useContext, useCallback, ChangeEvent, useMemo } from "react";
import Draggable, { DraggableEvent, DraggableProps } from "react-draggable";
import styles from "./index.module.css";
import React from "react";
import { Context } from "../../components/Provider";

const BoxItem = React.memo(function BoxItem({
  index,
  text,
  ...rest
}: Partial<DraggableProps> & {
  index: number;
  text: string | number;
}) {
  const nodeRef = useRef(null);

  const {
    state: { positions, sizes },
    selectors: { position, size },
    actions: { changePosition },
  } = useContext(Context);

  // const p = useMemo(() => position(index), [index]);
  // const { width, height } = useMemo(() => size(index), [index]);
  const p = position(index);
  const { width, height } = size(index);

  const style = {
    width: `${width}px`,
    height: `${height}px`,
  };

  const onDragAction = (
    _: DraggableEvent,
    { x, y }: { x: number; y: number }
  ) => {
    changePosition(index, { x, y });
  };

  return (
    <Draggable nodeRef={nodeRef} position={p} onDrag={onDragAction} {...rest}>
      <div style={style} className={styles.Box} ref={nodeRef}>
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
  const {
    actions: { remove, resize, changePosition },
  } = useContext(Context);

  const onRemoveItem = () => remove(index);
  const onChangePositionX = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    changePosition(index, { x: parseInt(value) | 0, y });
  };
  const onChangePositionY = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    changePosition(index, { x, y: parseInt(value) | 0 });
  };
  const onResizeWidth = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    resize(index, { width: parseInt(value) | 0, height });
  };
  const onResizeHeight = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    resize(index, {
      width,
      height: parseInt(value) | 0,
    });
  };

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
          <td className={styles.Button} onClick={onRemoveItem}>
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
              onChange={onChangePositionX}
            />
          </td>
          <td>
            <input
              type="text"
              size={4}
              value={y}
              onChange={onChangePositionY}
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
              onChange={onResizeWidth}
            />
          </td>
          <td>
            <input
              type="text"
              size={4}
              value={height}
              onChange={onResizeHeight}
            />
          </td>
        </tr>
      </table>
    </li>
  );
});

function Content() {
  const {
    actions: { add },
    state: { positions, sizes },
  } = useContext(Context);

  return (
    <div className={styles.Content}>
      <div className={styles.Slider}>
        <div className={styles.Button} onClick={() => add()}>
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

export default React.memo(Content);

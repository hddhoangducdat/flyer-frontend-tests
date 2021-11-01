import { useEffect, useRef, useState } from "react";

// DO NOT MODIFY THIS
const mockDataReturn = Array.from({ length: 100_000 }).map((_, index) => {
  const id = `${index + 1}`;
  return {
    id,
    text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit ut quaera.",
  };
});
// DO NOT MODIFY THIS
const mockIdsReturns = Array.from({ length: 100_000 }).map(
  (_, index) => `${index + 1}`
);

const toMockDataReturnMap = (() => {
  const dataMap: Record<string, string> = {};
  mockDataReturn.forEach(({ id, text }) => {
    dataMap[id] = text;
  });
  return dataMap;
})();

const ITEM_RENDERS = 100;

export default function OptimizeThisRender() {
  const [numberToRender, setNumberToRender] = useState(100);
  const [offSet, setOffSet] = useState(0);
  const [scroll, setScroll] = useState(0);
  const listRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {}, [offSet]);

  useEffect(() => {
    if (listRef.current) {
      const list = listRef.current;
      // scrollTop not equal to scrollHeight
      if (list.scrollTop === 5218 && offSet + ITEM_RENDERS !== numberToRender) {
        setOffSet(offSet + ITEM_RENDERS);
        list.scrollTop = 1;
      } else if (list.scrollTop === 0 && offSet !== 0) {
        setOffSet(offSet - ITEM_RENDERS);
        list.scrollTop = 5217;
      }
    }
  }, [scroll]);

  return (
    <div className="max-w-lg mx-auto">
      <p className="text-center">
        Render this list takes too long if "number to render" is too high
        (100.000 probably will hang), see in code and optimize this.
      </p>
      <div className="mt-4 mb-2">
        number to render:{" "}
        <select
          value={numberToRender}
          onChange={(e) => {
            setNumberToRender(parseInt(e.target.value));
          }}
        >
          <option value={100}>100</option>
          <option value={1_000}>1.000</option>
          <option value={10_000}>10.000</option>
          <option value={100_000}>100.000</option>
        </select>
      </div>
      <ul
        ref={listRef}
        className="overflow-y-scroll max-h-96 border"
        onScroll={() => {
          if (listRef.current) setScroll(listRef.current?.scrollTop);
        }}
      >
        {mockIdsReturns.slice(offSet, offSet + ITEM_RENDERS).map((id) => {
          return (
            <li className="p-1" key={id}>
              {toMockDataReturnMap[id]
                ? id + " - " + toMockDataReturnMap[id]
                : "Not found!"}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

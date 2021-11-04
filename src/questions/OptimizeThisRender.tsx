import { useCallback, useEffect, useRef, useState } from "react";
import {} from "react";

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

interface VirtualizedListProps {
  numItems: number;
  itemHeight: number;
  renderItem: ({ index, style }: any) => void;
  windowHeight: number;
}

const VirtualizedList: React.FC<VirtualizedListProps> = ({
  itemHeight,
  numItems,
  renderItem,
  windowHeight,
}) => {
  const [scrollTop, setScrollTop] = useState(0);

  const innerHeight = numItems * itemHeight;
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(
    numItems - 1,
    Math.floor((scrollTop + windowHeight) / itemHeight)
  );
  const items = [];

  for (let i = startIndex; i <= endIndex; i++) {
    items.push(
      renderItem({
        index: i,
        style: {
          position: "absolute",
          top: `${i * itemHeight}px`,
          width: "100%",
        },
      })
    );
  }

  return (
    <div
      className="overflow-y-scroll max-h-96 border"
      onScroll={({ currentTarget: { scrollTop } }) => setScrollTop(scrollTop)}
    >
      <div style={{ position: "relative", height: `${innerHeight}px` }}>
        {items}
      </div>
    </div>
  );
};

export default function OptimizeThisRender() {
  const [numberToRender, setNumberToRender] = useState(100);
  const [items, setItems] = useState<any[]>(
    mockIdsReturns.slice(0, numberToRender)
  );

  useEffect(() => {
    setItems(mockIdsReturns.slice(0, numberToRender));
  }, [numberToRender]);

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

      <VirtualizedList
        numItems={items.length}
        itemHeight={55}
        windowHeight={400}
        renderItem={({ index, style }: any) => {
          const id = items[index];
          return (
            <div key={id} className="p-1" style={style}>
              {toMockDataReturnMap[id]
                ? id + " - " + toMockDataReturnMap[id]
                : "Not found"}
            </div>
          );
        }}
      />
    </div>
  );
}

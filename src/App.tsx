import { useState } from "react";
import "./App.css";
import ImproveArrayRender from "./questions/ImproveArrayRender";
import RunnableFunction from "./questions/RunnableFunction";
import CleanThisComponent from "./questions/CleanThisComponent";
import DynamicArrayRender from "./questions/DynamicArrayRender";
import OptimizeThisRender from "./questions/OptimizeThisRender";
import { Provider } from "./components/Provider";

const OPTIONS = [
  { label: "Runnable Function", Component: RunnableFunction },
  { label: "Clean this component", Component: CleanThisComponent },
  { label: "Optimize this render", Component: OptimizeThisRender },
  { label: "Improve Array Render", Component: ImproveArrayRender },
  { label: "Dynamic Array Render", Component: DynamicArrayRender },
];

export default function App() {
  const [select, setSelect] = useState(0);
  const Component = OPTIONS[select].Component;

  return (
    <Provider>
      <div className="App">
        <div className="App-questions-select">
          Select question:{" "}
          <select
            value={select}
            onChange={(e) => setSelect(parseInt(e.target.value))}
          >
            {OPTIONS.map(({ label }, index) => {
              return (
                <option key={index} value={index}>
                  {index + 1}. {label}
                </option>
              );
            })}
          </select>
        </div>
        <div className="App-content">
          <Component />
        </div>
      </div>
    </Provider>
  );
}

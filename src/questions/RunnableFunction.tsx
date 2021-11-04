import SyntaxHighlighter from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/hljs";

export default function RunnableFunction() {
  function sum(
    num1: number,
    num2?: number
  ): ((num: number) => number) | number | any {
    if (num2) return num1 + num2;
    return (num: number) => {
      return num + num1;
    };
  }

  console.log(sum(2, 5));
  console.log(sum(2)(5));

  return (
    <div className="max-w-lg mx-auto">
      <p className="text-red-50">
        Make this function runnable. Write this function in it component and run
        in "console.log"
      </p>
      <SyntaxHighlighter language="javascript" style={dark}>
        {`
          sum(2, 5) // 7
          sum(2)(5) // 7
        `}
      </SyntaxHighlighter>
    </div>
  );
}

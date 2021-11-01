import SyntaxHighlighter from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/hljs";

export default function RunnableFunction() {
  const sum = (num1: number, num2: number) => {
    return num1 + num2;
  };

  const sum2 = (num1: number) => (num2: number) => {
    return num1 + num2;
  };

  console.log(sum(2, 5));
  console.log(sum2(2)(5));

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

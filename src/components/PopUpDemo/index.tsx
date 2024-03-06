import { useState } from "react";

export default function PopUpDemo() {
  const [count, setCount] = useState(0);

  console.log("PopUpDemo Render");

  return (
    <div className="w-[100px] h-[50px] border border-red-500 z-10">
      <div>{count}</div>
      <div onClick={() => setCount((prev) => prev + 1)}>Increment</div>
    </div>
  );
}

import React from "react";
import ChildD from "./ChildD";
import { useContext } from "react";
import { myStore } from "./ContextExample";

//^Step 4 === Consuming The Context using useContext Hook

const ChildC = () => {
  const data = useContext(myStore);
  console.log(data);
  return (
    <div>
      <h1>Child C === {data.message}</h1>

      <ChildD />
    </div>
  );
};

export default ChildC;

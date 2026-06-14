import React from "react";
import { useContext } from "react";
import { myStore } from "./ContextExample";

const ChildD = () => {
  const data = useContext(myStore);
  return (
    <div>
      <h1>Child D === {data.arr}</h1>
    </div>
  );
};

export default ChildD;

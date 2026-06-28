import React, { useContext } from "react";
import { myStore } from "./ContextExample";

const ChildB = () => {
  //~Step 3 === Consuming the context
  //~useContext requires myStore object returned by the createContext object.
  let data = useContext(myStore);
  return (
    <div>
      <h1>Child B</h1>
      <h1>{data.obj.name}</h1>
    </div>
  );
};

export default ChildB;

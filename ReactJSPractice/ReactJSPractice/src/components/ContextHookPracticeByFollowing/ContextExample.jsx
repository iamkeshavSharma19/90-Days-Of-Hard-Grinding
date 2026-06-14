import React from "react";
import { createContext } from "react";

//&Step 1 === Create a context using createContext Method.
//~Step2 === Providing values to the context
//?Step 3 === Providing the context to the Parent
export const myStore = createContext();
console.log(myStore);

const ContextExample = (props) => {
  console.log("Props === ", props);
  const message = "Namaste EveryOne";
  const arr = [10, 20, 30];
  return (
    <myStore.Provider value={{ message, arr }}>
      {props.children}
    </myStore.Provider>
  );
};

export default ContextExample;

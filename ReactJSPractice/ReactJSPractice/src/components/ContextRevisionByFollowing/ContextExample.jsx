import { createContext } from "react";
import Parent from "./Parent";
//?Step1 === Create a context using createContext().When we call this context object, it returns us a context object which is our store room, a global space/object where we keep our global object.

export const myStore = createContext();

//^Step 2 === Provide a context using contextObject.Provider

const ContextExample = (props) => {
  //   console.log(props);
  let str = "Hello World";
  let arr = [10, 20, 30];
  let obj = { name: "Keshav" };
  return (
    <div>
      <myStore.Provider value={{ str, arr, obj }}>
        {props.children}
      </myStore.Provider>
    </div>
  );
};

export default ContextExample;

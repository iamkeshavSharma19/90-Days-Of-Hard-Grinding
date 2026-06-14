import { useState } from "react";

const PlayingWithSetState02 = () => {
  const [number, setNumber] = useState(0);
  console.log(number);

  return (
    <>
      <h1>{number}</h1>
      <button
        onClick={() => {
          setNumber(number + 5);
          console.log(number);
          setNumber(42);
          setNumber((n) => {
            return n + 1;
          });
          console.log(number);

          console.log(number);
        }}
      >
        Increase the number
      </button>
    </>
  );
};

export default PlayingWithSetState02;

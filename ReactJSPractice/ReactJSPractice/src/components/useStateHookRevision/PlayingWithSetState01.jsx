import { useState } from "react";

const PlayingWithSetState01 = () => {
  const [number, setNumber] = useState(0);
  console.log(number);

  return (
    <>
      <h1>{number}</h1>
      <button
        onClick={() => {
          //~Predict the output
          //~the number will be incremented by 6
          setNumber(number + 5);
          console.log(number);
          setNumber(number + 5);
          console.log(number);
          setNumber((n) => {
            return n + 1;
          });
          console.log(number);
        }}
      >
        Increase the number
      </button>
    </>
  );
};

export default PlayingWithSetState01;

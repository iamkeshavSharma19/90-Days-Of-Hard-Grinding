import React from "react";
import Button from "./Button";

const list = [
  "All",
  "Gaming",
  "Songs",
  "Live",
  "Soccer",
  "Cricket",
  "News",
  "ReactJS",
  "BrockLesnar",
  "Coding",
  "Javascript",
  "Movie",
  "NodeJS",
];

const ButtonList = () => {
  return (
    <div className="flex ">
      {list.map((ele) => (
        <Button name={ele} key={ele} />
      ))}
    </div>
  );
};

export default ButtonList;

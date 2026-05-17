import React from "react";
import SearchBar from "./components/SearchBar";

const App = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <h1
          className="text-white font-extrabold text-8xl mt-6"
          style={{ fontFamily: "Bungee Spice" }}
        >
          KS Images
        </h1>
      </div>
      <SearchBar />
    </>
  );
};

export default App;

import React from "react";
import { useState } from "react";

const ControlledForms1 = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleUsername = (e) => {
    // console.log(e);
    // console.log(e.target.value);
    setUsername(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      alert("All Fields are required");
      return;
    }

    console.log("Form Submitted");

    let formData = { username, email, password };

    console.log(formData);

    //&Storing the data in the Local Storage
    //*Check if the already users exists in the local storage
    const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
    console.log(savedUsers);
    savedUsers.push(formData);
    localStorage.setItem("users", JSON.stringify(savedUsers));
  };

  return (
    <div>
      <h1>Controlled Forms By Following</h1>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="username">Username : </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleUsername}
        />
        <br /> <br />
        <label htmlFor="email">Email : </label>
        <input type="text" id="email" value={email} onChange={handleEmail} />
        <br /> <br />
        <label htmlFor="password">Password : </label>
        <input
          type="text"
          id="password"
          value={password}
          onChange={handlePassword}
        />
        <br /> <br />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default ControlledForms1;

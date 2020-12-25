import React, { Component, ComponentState, useState } from "react";

interface Props {
  clouseSignUp: () => void;
  clousePoup: any;
}

export const SignUp = ({ clouseSignUp, clousePoup }: Props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handelSignUp = () => {
    alert("W");
    clousePoup();
  };

  return (
    <div className="auth">
      <button onClick={() => clouseSignUp()}>X</button>
      <div className="create-user">
        <h1>Sign up</h1>
        <form>
          <p>Username</p>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Your email"
          />
          <p>Email</p>
          <input
            type="text"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Your email"
          />
          <p>Password</p>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Your password"
          />
          <button onClick={() => handelSignUp()}>Sign Up</button>
        </form>
      </div>
    </div>
  );
};

import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import {
  validateEmail,
  validatePass,
  validateUserName,
} from "../../utils/valideteInput";
import { InputAuth } from "../InputComponet/InputAuth/InputAuth";
import { postSignUp } from "../../requests/auth";

interface Props {
  clouseSignUp: () => void;
  clousePoup: any;
}

export const SignUp = ({ clouseSignUp, clousePoup }: Props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [userNameErr, setUsernameErr] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [passErr, setPassErr] = useState(false);

  const handelSignUp = () => {
    if (
      username &&
      email &&
      password &&
      !userNameErr &&
      !emailErr &&
      !passErr
    ) {
      postSignUp({ username, email, password });
    }
  };

  return (
    <div className="auth">
      <button className="authClouseBtn" onClick={() => clouseSignUp()}>
        X
      </button>
      <div className="create-user">
        <div className="avatarConteiner">
          <FontAwesomeIcon icon={faUser} className="avatarIcon" />
        </div>
        <div className="create-ucer_conteiner">
          <h1>Sign up</h1>
          <form>
            <InputAuth
              className="inputAuth"
              type="text"
              label="Useranme"
              onBlur={() =>
                validateUserName(username, (res: boolean) =>
                  setUsernameErr(res)
                )
              }
              style={
                userNameErr
                  ? { border: "1px solid red" }
                  : { border: "1px solid" }
              }
              name="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Enter your userName"
              err={userNameErr}
            />
            <InputAuth
              className="inputAuth"
              type="text"
              label={"Email"}
              onBlur={() =>
                validateEmail(email, (res: boolean) => setEmailErr(res))
              }
              style={
                emailErr ? { border: "1px solid red" } : { border: "1px solid" }
              }
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email"
              err={emailErr}
            />
            <InputAuth
              className="inputAuth"
              type="password"
              label="Prassword"
              style={
                passErr ? { border: "1px solid red" } : { border: "1px solid" }
              }
              onBlur={() =>
                validatePass(password, (res: boolean) => setPassErr(res))
              }
              name="password"
              value={password}
              onChange={(event) => setPass(event.target.value)}
              placeholder="Enter your password"
              err={passErr}
            />
            <div className="auth-btn_conteiner">
              <button type="button" onClick={() => handelSignUp()}>
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

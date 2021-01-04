import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { postSignIn } from "../../requests/auth";
import { validateEmail, validatePass } from "../../utils/valideteInput";
import { InputAuth } from "../InputComponet/InputAuth/InputAuth";
interface Props {
  clousePoup: () => void;
  openSignUp: () => void;
}

export const SignIn = ({ clousePoup, openSignUp }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [emailErr, setEmailErr] = useState(false);
  const [passErr, setPassErr] = useState(false);

  const handelSignIn = () => {
    if (!emailErr && email && !passErr && password) {
      postSignIn({ email, password });
      clousePoup();
    }
  };

  return (
    <div className="auth">
      <button className="authClouseBtn" onClick={() => clousePoup()}>
        X
      </button>
      <div className="create-user">
        <div className="avatarConteiner">
          <FontAwesomeIcon icon={faUser} className="avatarIcon" />
        </div>
        <div className="create-ucer_conteiner">
          <h1>Sign in</h1>
          <form>
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
              placeholder="Your email"
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
              placeholder="Your password"
              err={passErr}
            />
            <div className="auth-btn_conteiner">
              <button type="button" onClick={() => handelSignIn()}>
                Sign In
              </button>
            </div>
          </form>
          <p>
            Create account?
            <span onClick={() => openSignUp()}>Signup</span>
          </p>
        </div>
      </div>
    </div>
  );
};

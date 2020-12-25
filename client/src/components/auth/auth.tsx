import React, { useState } from "react";
import { ModalLayout } from "../../layout/modalLayout/ModalLayout";
import { SignIn, SignUp } from "../";
import "./style.css";

interface Props {
  closePopup: () => void;
}

export const Auth = ({ closePopup }: Props) => {
  const [signIn, setSignIn] = useState(true);

  return (
    <ModalLayout>
      {signIn ? (
        <SignIn
          clousePoup={() => closePopup()}
          openSignUp={() => setSignIn(false)}
        />
      ) : (
        <SignUp
          clouseSignUp={() => setSignIn(true)}
          clousePoup={() => closePopup()}
        />
      )}
    </ModalLayout>
  );
};

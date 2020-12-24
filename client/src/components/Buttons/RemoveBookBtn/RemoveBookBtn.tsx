import React from "react";
import { useHistory } from "react-router-dom";
import { removeBookStorage } from "../../../utils/storage";
import "./style.css";

interface Props {
  id: string;
}

export const RemoveBookBtn = ({ id }: Props) => {
  const history = useHistory();

  const handelRemove = (event: any, id: string) => {
    removeBookStorage(id);
    event.stopPropagation();
    history.go(0);
  };

  return (
    <button
      className="btnDelBook"
      onClick={(event: any) => handelRemove(event, id)}
    >
      x
    </button>
  );
};

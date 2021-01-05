import React from "react";
import { removeBookStorage } from "../../../utils/storage";
import "./style.css";

interface Props {
  id: string;
}

export const RemoveBookBtn = ({ id }: Props) => (
  <button
    className="btnDelBook"
    onClick={(event: any) => handelRemove(event, id)}
  >
    Remove
  </button>
);

const handelRemove = (event: any, id: string) => {
  removeBookStorage(id);
  event.stopPropagation();
};

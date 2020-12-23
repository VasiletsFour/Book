import React, { useState } from "react";
import { DebounceInput } from "react-debounce-input";
import "./style.css";

interface Props {
  page: string;
  callBack: (qeury: string) => void;
}

function Baner({ page, callBack }: Props) {
  const [name, setNmae] = useState("");

  function search(event: any) {
    setNmae(event.target.value);
    callBack(`?word=${event.target.value}`);
  }

  return (
    <div className="conteiner">
      <p>Home/ {page}</p>
      <form>
        <DebounceInput
          debounceTimeout={3000}
          type="text"
          placeholder="search"
          value={name}
          onChange={search}
        />
      </form>
    </div>
  );
}

export default Baner;

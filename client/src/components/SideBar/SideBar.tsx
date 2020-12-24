import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Input, Radio } from "../";
import { BookApi, getBooks } from "../../requests/book";
import "./style.css";

export const SideBar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(3000);
  const [type, setType] = useState();

  const handelCkick = () => {
    const queryStr = `?${min ? `min=${min}&` : ""}${
      max < 3000 ? `max=${max}` : ""
    }`;

    history.push({
      search: queryStr,
    });

    getBooks(
      (data: Array<BookApi>) => dispatch({ type: "BOOKS", data: data }),
      queryStr
    );
  };

  return (
    <div className="sideBarConteiener">
      <h1 className="bookTitle">CATALOG</h1>
      <div className="bar">
        <div className="radio-input">
          <h3>CATEGORY</h3>
          <Radio className="radio-conteiner" name="cind" value="book" />
          <Radio className="radio-conteiner" name="cind" value="newsPaper" />
          <Radio className="radio-conteiner" name="cind" value="magazine" />
        </div>
        <div className="price-wrapper">
          <h3>PRICE, $</h3>
          <div className="price-input_wrapper">
            <Input
              type="number"
              value={min}
              min={0}
              max={3000}
              handelChange={(event: any) =>
                Number(event.target.value) < max &&
                setMin(Number(event.target.value))
              }
            />
            <Input
              type="number"
              value={max}
              min={0}
              max={3000}
              handelChange={(event: any) =>
                Number(event.target.value) > min &&
                setMax(Number(event.target.value))
              }
            />
            <p>$</p>
            <button
              onClick={() => {
                handelCkick();
              }}
            >
              ok
            </button>
          </div>
          <section className="range-slider">
            <Input
              value={min}
              min={0}
              max={3000}
              type="range"
              handelChange={(event: any) =>
                Number(event.target.value) < max &&
                setMin(Number(event.target.value))
              }
            />
            <Input
              value={max}
              min={0}
              max={3000}
              type="range"
              handelChange={(event: any) =>
                Number(event.target.value) > min &&
                setMax(Number(event.target.value))
              }
            />
          </section>
        </div>
      </div>
    </div>
  );
};

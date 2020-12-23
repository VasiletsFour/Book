import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { BookApi, getBook, getBooks } from "../../requests/book";
import "./style.css";

export const SideBar = () => {
  const dispatch = useDispatch();
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(3000);

  const handelCkick = () => {
    getBooks(
      (data: Array<BookApi>) => dispatch({ type: "BOOKS", data: data }),
      `?${max ? `max=${max}` + "&" : ""}${min ? `min=${min}` : ""}`
    );
  };

  return (
    <div>
      <h1 className="bookTitle">CATALOG</h1>
      <div className="bar">
        <div className="radio-input">
          <h3>CATEGORY</h3>
          <div className="radio-conteiner">
            <input type="radio" name="cind" value="book" />
            <p>Book</p>
          </div>
          <div className="radio-conteiner">
            <input type="radio" name="cind" value="NewsPaper" />
            <p>News Paper</p>
          </div>
          <div className="radio-conteiner">
            <input type="radio" name="cind" value="Magazine" />
            <p>Magazine</p>
          </div>
        </div>
        <div className="price-wrapper">
          <h3>PRICE, $</h3>
          <div className="price-input_wrapper">
            <input
              type="number"
              value={min}
              min={0}
              max={3000}
              onChange={(event: any) =>
                Number(event.target.value) < max &&
                setMin(Number(event.target.value))
              }
            />
            <input
              type="number"
              value={max}
              min={0}
              max={3000}
              step={100}
              onChange={(event: any) =>
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
            <input
              value={min}
              min={0}
              max={3000}
              type="range"
              step={100}
              onChange={(event: any) =>
                Number(event.target.value) < max &&
                setMin(Number(event.target.value))
              }
            />
            <input
              value={max}
              min={0}
              max={3000}
              step={100}
              type="range"
              onChange={(event: any) =>
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

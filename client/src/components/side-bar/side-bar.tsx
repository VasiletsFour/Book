import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { BookApi, getBook } from "../../requests/book";
import "./style.css";

export const Bar = () => {
  const dispatch = useDispatch();
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(3000);

  return (
    <div className="bar">
      <div className="radi-input">
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
      <div>
        <div>
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
        </div>
        <h3>PRICE</h3>
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
      <button
        onClick={() =>
          getBook(
            (data: Array<BookApi>) => dispatch({ type: "BOOKS", data: data }),
            `?min=${min}&max=${max}`
          )
        }
      >
        ok
      </button>
    </div>
  );
};

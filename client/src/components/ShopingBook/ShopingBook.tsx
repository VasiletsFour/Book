import React, { useState, ChangeEvent, useEffect } from "react";
import { AuthorList } from "../AuthorList/AuthorList";
import { RemoveBookBtn } from "../Buttons/RemoveBookBtn/RemoveBookBtn";
import { BookAuthor } from "../../requests/book/api";
import "./style.css";

interface Props {
  id: string;
  title: string;
  author: Array<BookAuthor>;
  setTotal: (arg: number, secondArg: number) => void;
  price: number;
  total: number;
  currency: string;
}

export const ShopingBook = ({
  id,
  title,
  author,
  price,
  setTotal,
  total,
}: Props) => {
  const [countBook, setCountBook] = useState(1);

  const handelCount = (event: ChangeEvent<HTMLInputElement>) => {
    const count = Number(event.target.value);

    setTotal(total - countBook * price, count * price);
    setCountBook(count);
  };
  //   useEffect(() => {
  //     setTotal(total, price * countBook);
  //   }, [countBook]);

  return (
    <div className="shopingBook">
      <div className="shopng-product">
        <div className="shopingBookImg"></div>
        <div className="shopingBookWrapper">
          <h4>{title}</h4>
          <AuthorList className="shopingAuthor" author={author} />
        </div>
      </div>
      <div className="shopng-price">
        <p className="shopingBookPrice">${price}</p>
      </div>
      <div className="shopng-qty">
        <input
          type="number"
          name="counBook"
          value={countBook}
          min="0"
          max="10"
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            handelCount(event)
          }
        />
      </div>
      <div className="shopng-order">
        <p>{price * countBook}</p>
      </div>
      <div className="shopng-buy">
        <button className="shopingBookBuyBtn" onClick={() => alert("Buy")}>
          Buy
        </button>
        <RemoveBookBtn id={id} />
      </div>
    </div>
  );
};

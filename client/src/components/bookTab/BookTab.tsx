import React from "react";
import { useHistory } from "react-router-dom";
import { BOOK } from "../../utils/urls";
import { AuthorList } from "../AuthorList/AuthorList";
import "./style.css";

interface Props {
  id: string;
  name: string;
  author: Array<any>;
  price: number;
  currency: string;
}

export const BookTab = ({ id, name, author, price, currency }: Props) => {
  const history = useHistory();
  const currencyCapitalized =
    currency.charAt(0).toUpperCase() + currency.slice(1);

  return (
    <div onClick={() => history.push(BOOK.format({ id }))} className="cart">
      <div className="img-conteiner">{/* <img src={} /> */}</div>
      <p className="name" id="bookName">
        {name}
      </p>
      <AuthorList className="author" author={author} />
      <p className="price" id="bookPrice">
        {price}
        <span>{currencyCapitalized}</span>
      </p>
    </div>
  );
};

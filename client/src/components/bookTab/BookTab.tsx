import React from "react";
import { useHistory } from "react-router-dom";
import { JsxElement } from "typescript";
import { BOOK } from "../../utils/urls";
import { AuthorList } from "../AuthorList/AuthorList";
import "./style.css";

interface Props {
  id: string;
  name: string;
  author: Array<any>;
  price: number;
  currency: string;
  children?: JSX.Element;
}

export const BookTab = ({
  id,
  name,
  author,
  price,
  currency,
  children,
}: Props) => {
  const history = useHistory();
  const currencyCapitalized =
    currency.charAt(0).toUpperCase() + currency.slice(1);

  return (
    <div onClick={() => history.push(BOOK.format({ id }))} className="cart">
      {children}
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

import React from "react";
import { BookAuthor } from "../../requests/book";
import "./style.css";

interface Props {
  id: string;
  name: string;
  author: Array<any>;
  price: number;
}

export const Book = ({ id, name, author, price }: Props) => (
  <a className="cart">
    <div className="img-conteiner">{/* <img src={} /> */}</div>
    <p className="name" id="bookName">
      {name}
    </p>
    {author.map((i: BookAuthor) => (
      <p key={i.id}>{i.name}</p>
    ))}
    <p className="price" id="bookPrice">
      {price}
      <span>Грн</span>
    </p>
  </a>
);

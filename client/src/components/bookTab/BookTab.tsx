import React from "react";
import { Link } from "react-router-dom";
import { BookAuthor } from "../../requests/book";
import { AuthorList } from "../authorList/AuthorList";
import "./style.css";

interface Props {
  id: string;
  name: string;
  author: Array<any>;
  price: number;
}

export const BookTab = ({ id, name, author, price }: Props) => (
  <Link to={`book/${id}`} className="cart">
    <div className="img-conteiner">{/* <img src={} /> */}</div>
    <p className="name" id="bookName">
      {name}
    </p>
    <AuthorList author={author} />
    <p className="price" id="bookPrice">
      {price}
      <span>Грн</span>
    </p>
  </Link>
);

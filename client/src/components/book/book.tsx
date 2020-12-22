import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getBook, BookApi } from "../../requests/book";
import { AuthorList } from "../authorList/AuthorList";
import auth from "../auth/auth";
// import "./style.css";

interface Params {
  id?: string;
}

export const Book = () => {
  let { id }: Params = useParams();
  const [book, setBook] = useState<BookApi | undefined>();
  const [count, setCount] = useState(1);

  useEffect(() => {
    id && getBook((book: any) => setBook(book), id);
  }, []);
  console.log(book);
  if (book) {
    return (
      <div className="book">
        <div className="book-img">
          <div></div>
        </div>
        <div className="book-info">
          <h2>{book.name}</h2>
          <p>{book.description}</p>
          <div>
            <span>by</span>
            <AuthorList author={book.author} />
          </div>
          <div>
            <input
              type="number"
              name="count"
              value={count}
              min="1"
              max="10"
              onChange={(event: any) => setCount(event.currentTarget.value)}
            />
            <p>$ {count ? count * book.price : book.price}</p>
          </div>
          <button>Add to cart</button>
        </div>
      </div>
    );
  }

  return null;
};

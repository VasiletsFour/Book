import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InitialState } from "../../redux/store";
import { BookApi, getBooks } from "../../requests/book";
import Baner from "../search-input/search-bar";
import { Bar } from "../side-bar/SideBar";
import { BookTab } from "../bookTab/BookTab";
import "./style.css";

export const Books = () => {
  const [stop, setStop] = useState(false);
  const dispatch = useDispatch();
  const { books } = useSelector((state: InitialState) => ({
    books: state.books,
  }));

  const bookList = (qeury?: string) =>
    getBooks(
      (data: Array<BookApi>) => dispatch({ type: "BOOKS", data: data }),
      qeury
    );

  useEffect(() => {
    setStop(true);
    bookList();
  }, [stop]);

  return (
    <div>
      <Baner
        page={"Book Catalog"}
        callBack={(qeury: string) => bookList(qeury)}
      />
      <div className="wrapperBooks">
        <h1 className="bookTitle">CATALOG</h1>
        <div>
          <Bar />
          <div className="book-conteiner">
            {books?.map((item: BookApi) => (
              <BookTab
                key={item.id}
                id={item.id}
                name={item.name}
                author={item.author}
                price={item.price}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

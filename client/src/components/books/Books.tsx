import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BookTab, LoadingSpinner, SideBar, TopBar } from "../";
import { InitialState } from "../../redux/store";
import { BookApi, getBooks } from "../../requests/book";
import Baner from "../SearchInput/search-bar";
import "./style.css";

export const Books = () => {
  const dispatch = useDispatch();
  const [stop, setStop] = useState(false);
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

  if (books) {
    return (
      <div>
        <Baner
          page={"Book Catalog"}
          callBack={(qeury: string) => bookList(qeury)}
        />
        <div className="wrapperBooks">
          <div className="booksContent">
            <SideBar />
            <div className="booksContentWrapper">
              <div className="booksTopBar">
                <TopBar />
              </div>
              <div className="book-conteiner">
                {books?.map((item: BookApi) => (
                  <BookTab
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    author={item.author}
                    price={item.price}
                    currency={item.currency}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="booksSpinner">
      <LoadingSpinner />
    </div>
  );
};

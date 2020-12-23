import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { InitialState } from "../../redux/store";
import { BookApi, getBook } from "../../requests/book";
import { LoadingSpinner } from "../Spinner/Spinner";
import { AuthorList } from "../AuthorList/AuthorList";
import "./style.css";

interface Params {
  id?: string;
}

export const Book = () => {
  let { id }: Params = useParams();
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const { book } = useSelector((state: InitialState) => ({
    book: state.book,
  }));

  useEffect(() => {
    id &&
      getBook((book: BookApi) => dispatch({ type: "BOOK", data: book }), id);
  }, []);

  if (book) {
    return (
      <div>
        {id !== book?.id ? (
          <div className="book">
            <LoadingSpinner className="bookSpinner" />
          </div>
        ) : (
          <div className="book">
            <div className="book_img-conteiner">
              <div className="book_img"></div>
            </div>
            <div className="book-info">
              <div>
                <h2 className="book-info_title">{book.name}</h2>
                <p className="book-info_description">{book.description}</p>
                <div className="book-author_conteiner">
                  <span className="book-author_text">by</span>
                  <AuthorList className="book-author" author={book.author} />
                </div>
                <div className="book-input_conteiner">
                  <p className="book-price">Qty:</p>
                  <form action="">
                    <input
                      className="book-input"
                      type="number"
                      name="count"
                      value={count}
                      min="1"
                      max="10"
                      onChange={(event: any) =>
                        setCount(event.currentTarget.value)
                      }
                    />
                  </form>
                  <p className="book-price book-price_text">
                    ${count ? count * book.price : book.price}
                  </p>
                </div>
                <button className="book-add_btn">
                  <img
                    src="/img/shoppingCart.png"
                    className="book-btn_icon"
                    alt="shooping"
                  />{" "}
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return null;
};

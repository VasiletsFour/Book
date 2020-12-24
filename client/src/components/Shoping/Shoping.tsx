import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { BookTab, LoadingSpinner } from "../";
import { InitialState } from "../../redux/store";
import { BookApi, postShoping } from "../../requests/book";
import { getBookStorage, removeBookStorage } from "../../utils/storage";
import "./style.css";

export const Shoping = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const shopingStorage = getBookStorage();
  const { shoping } = useSelector((state: InitialState) => ({
    shoping: state.shoping,
  }));

  useEffect(() => {
    if (shopingStorage && !shoping) {
      postShoping(
        (data: Array<BookApi>) => dispatch({ type: "SHOPING", data: data }),
        { shoping: shopingStorage }
      );
    }
  }, [shoping]);

  const handelRemove = (event: any, id: string) => {
    removeBookStorage(id);
    event.stopPropagation();
    history.go(0);
  };

  if (!shopingStorage || !shopingStorage.length) {
    return <h1>Empty</h1>;
  }

  if (shoping) {
    return (
      <div className="shoping">
        {shoping?.map((item: BookApi) => (
          <BookTab
            key={item.id}
            id={item.id}
            name={item.name}
            author={item.author}
            price={item.price}
            currency={item.currency}
          >
            <button
              className="btnDelBook"
              onClick={(event: any) => handelRemove(event, item.id)}
            >
              x
            </button>
          </BookTab>
        ))}
      </div>
    );
  }

  return (
    <div className="shopingLoadingSpiner">
      <LoadingSpinner />
    </div>
  );
};

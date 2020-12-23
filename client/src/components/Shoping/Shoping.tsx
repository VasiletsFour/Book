import React from "react";
import { useSelector } from "react-redux";
import { BookTab, LoadingSpinner } from "../";
import { InitialState } from "../../redux/store";
import { BookApi, postShoping } from "../../requests/book";
import "./style.css";

export const Shoping = () => {
  const { shoping } = useSelector((state: InitialState) => ({
    shoping: state.shoping,
  }));

  if (shoping) {
    return (
      <div>
        {shoping?.map((item: BookApi) => (
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
    );
  }

  return (
    <div className="shopingLoadingSpiner">
      <LoadingSpinner />
    </div>
  );
};

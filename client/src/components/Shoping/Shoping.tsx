import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoadingSpinner, ShopingBook, TotalPrice } from "../";
import { ModalLayout } from "../../layout/modalLayout/ModalLayout";
import { InitialState } from "../../redux/store";
import { BookApi, postShoping } from "../../requests/book";
import { getBookStorage } from "../../utils/storage";
import "./style.css";

interface Props {
  clousePopup: () => void;
}

export const Shoping = ({ clousePopup }: Props) => {
  const dispatch = useDispatch();
  const shopingStorage = getBookStorage();
  const [totalPrice, setTotalPrice] = useState(0);
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
    if (shoping) {
      const price: Array<number> = shoping.map((item: any) => item.price);

      const priceSum: any = price.reduce(
        (first: any, second: any) => first + second
      );
      setTotalPrice(priceSum);
    }
  }, [shoping]);

  return (
    <ModalLayout>
      {shoping ? (
        <div className="shoping">
          <ul className="shoping-top">
            <li className="shopng-product">
              <h3>product</h3>
            </li>
            <li className="shopng-price">
              <p>unit price</p>
            </li>
            <li className="shopng-qty">
              <p>qty</p>
            </li>
            <li className="shopng-order">
              <p>Order Amount</p>
            </li>
            <li className="shopng-buy">
              <p>Buy</p>
            </li>
          </ul>
          <div className="shopingList">
            {shoping?.map((item: BookApi) => (
              <ShopingBook
                key={item.id}
                id={item.id}
                total={totalPrice}
                setTotal={(total: number, price: number) =>
                  setTotalPrice(total + price)
                }
                title={item.name}
                author={item.author}
                price={item.price}
                currency={item.currency}
              />
            ))}
          </div>
          <div className="totalPriceConteiner">
            <TotalPrice
              className="totalPrice"
              total={totalPrice}
              arr={shoping}
            />
          </div>
          <div className="shopingBtnConteiner">
            <button
              className="shopingBtn shopingBtnCancel"
              onClick={() => clousePopup()}
            >
              Cancel
            </button>
            <button className="shopingBtn shopingBtnBuy">Buy Now</button>
          </div>
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </ModalLayout>
  );
};

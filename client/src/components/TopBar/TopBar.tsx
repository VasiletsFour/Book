import * as React from "react";
import { useDispatch } from "react-redux";
import { BookApi, getBooks } from "../../requests/book";
import { Select } from "../Select/Select";
import "./style.css";

export const TopBar = () => {
  const dispatch = useDispatch();
  const [currency, setCurrency] = React.useState("");
  const [sortBy, setSortBy] = React.useState("");

  React.useEffect(() => {
    if (currency || sortBy) {
      getBooks(
        (data: Array<BookApi>) => dispatch({ type: "BOOKS", data: data }),
        `?${currency ? `currency=${currency}` + "&" : ""}${
          sortBy ? `sortBy=${sortBy}` : ""
        }`
      );
    }
  }, [currency, sortBy]);

  return (
    <div className="topBar">
      <Select
        name="currency"
        options={["euro", "dolar", "rub"]}
        className="topBarSelect"
        value={currency}
        handleChange={(cur: string) => setCurrency(cur)}
      />
      <Select
        name="sortBy"
        options={["date", "price:low", "price:high"]}
        className="topBarSelect"
        value={sortBy}
        handleChange={(sort: string) => setSortBy(sort)}
      />
    </div>
  );
};

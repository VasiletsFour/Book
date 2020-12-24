import * as React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { BookApi, getBooks } from "../../requests/book";
import { Select } from "../";
import "./style.css";

export const TopBar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [currency, setCurrency] = React.useState("");
  const [sortBy, setSortBy] = React.useState("");

  React.useEffect(() => {
    if (currency || sortBy) {
      const queryStr = `?${currency ? `currency=${currency}&` : ""}${
        sortBy ? `sortBy=${sortBy}` : ""
      }`;
      history.push({
        search: queryStr,
      });

      getBooks(
        (data: Array<BookApi>) => dispatch({ type: "BOOKS", data: data }),
        queryStr
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

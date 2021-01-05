import React from "react";
import { BookApi } from "../../requests/book/api";

interface Props {
  arr: Array<BookApi>;
  className: string;
  total: number;
}

export const TotalPrice = ({ arr, className, total }: Props) => (
  <p className={className}>
    TOTAL PRICE <span>{total}</span>
  </p>
);

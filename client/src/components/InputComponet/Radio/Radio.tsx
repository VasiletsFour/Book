import React from "react";
import "./style.css";

interface Props {
  value: string;
  name: string;
  className: string;
}

export const Radio = ({ className, value, name }: Props) => (
  <div className={className}>
    <input type="radio" name={name} value={value} />
    <p className="radioInput">{value}</p>
  </div>
);

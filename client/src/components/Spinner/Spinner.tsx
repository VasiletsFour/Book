import * as React from "react";
import "./style.css";

interface Props {
  className?: string;
}

export const LoadingSpinner = ({ className }: Props) => (
  <div className={`loadingSpinner ${className}`} />
);

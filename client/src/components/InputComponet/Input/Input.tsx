import React from "react";

interface Props {
  value: number;
  min: number;
  max: number;
  type: string;
  handelChange: (event: any) => void;
}

export const Input = ({ handelChange, ...props }: Props) => (
  <input {...props} step={100} onChange={(event: any) => handelChange(event)} />
);

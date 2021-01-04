import React from "react";

interface Props {
  value: string;
  name: string;
  placeholder: string;
  type: string;
  onChange: (event: any) => void;
  style: {};
  onBlur: () => void;
  err: boolean;
  label: string;
  className: string;
}

export const InputAuth = ({ err, label, ...props }: Props) => (
  <div style={{ width: "100%" }}>
    <label>{label}</label>
    <input {...props} />
    {err && <p style={{ color: "red" }}>Invalid Email</p>}
  </div>
);

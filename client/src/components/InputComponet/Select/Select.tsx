import * as React from "react";

interface Props {
  name: string;
  options: Array<string>;
  className: string;
  value: string;
  handleChange: (arg: any) => void;
}

export const Select = ({
  name,
  options,
  className,
  value,
  handleChange,
}: Props) => (
  <div className={className}>
    <label className={`${className}-label`}>{name}</label>
    <select
      onChange={(event) => handleChange(event.currentTarget.value)}
      defaultValue={value || ""}
      className={`${className}-select`}
      name={name}
    >
      <option className={`${className}-option`} defaultChecked>
        filter
      </option>
      {options.map((item: string) => (
        <option key={item} className={`${className}-option`} value={item}>
          {item.toUpperCase()}
        </option>
      ))}
    </select>
  </div>
);

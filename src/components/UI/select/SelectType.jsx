import React from "react";
import "./SelectType.css";

const SelectType = ({ options, value, onChange, defaultValue }) => {
  return (
    <select
      className="select__type"
      defaultValue={defaultValue}
      value={value}
      onChange={(event) => onChange(event.target.value)}
    >
      {Object.keys(options).map((value) => (
        <option
          onClick={onChange}
          defaultValue={defaultValue}
          key={value}
          value={value}
          onChange={onChange}
        >
          {options[value]}
        </option>
      ))}
    </select>
  );
};

export default SelectType;

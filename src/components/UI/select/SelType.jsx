import React, { useState } from "react";
import "./SelectType.css";

const SelType = ({ options, value, onChange, defaultValue }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  console.log(value, selectedOption);
  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (value) => {
    setSelectedOption(value);
    setIsOpen(false);
    const key = Object.keys(options).find((key) => options[key] === value);
    onChange(key);
  };
  return (
    <div className="dropdown" onClick={toggleDropdown}>
      <div className="dropdown__button">{options[defaultValue]}</div>
      {isOpen && (
        <ul className="dropdown__list">
          {Object.values(options).map((option, index) => (
            <li
              key={index}
              className={
                selectedOption === value ? "active__mode" : "dropdown__item"
              }
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}

      <svg
        width="10"
        height="6"
        viewBox="0 0 10 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="dropdown__arrow"
      >
        <path
          d="M9.90008 0.601167L9.39911 0.100235C9.33236 0.0333416 9.25546 0 9.16853 0C9.08181 0 9.00494 0.0333416 8.93819 0.100235L5.00005 4.03816L1.06209 0.100341C0.995301 0.033447 0.918439 0.000105232 0.831611 0.000105232C0.744747 0.000105232 0.667886 0.033447 0.601132 0.100341L0.100235 0.601308C0.0333416 0.668061 0 0.744922 0 0.831786C0 0.91858 0.0334469 0.995441 0.100235 1.06219L4.76957 5.73164C4.83633 5.79843 4.91322 5.8318 5.00005 5.8318C5.08688 5.8318 5.16364 5.79843 5.23036 5.73164L9.90008 1.06219C9.96683 0.995406 10 0.918545 10 0.831786C10 0.744922 9.96683 0.668061 9.90008 0.601167Z"
          fill="currentColor"
        />
      </svg>
    </div>

    // <select
    //   className="select__type"
    //   defaultValue={defaultValue}
    //   value={value}
    //   onChange={(event) => onChange(event.target.value)}
    // >
    //   {Object.keys(options).map((value) => (
    //     <option
    //       onClick={onChange}
    //       defaultValue={defaultValue}
    //       key={value}
    //       value={value}
    //       onChange={onChange}
    //     >
    //       {options[value]}
    //     </option>
    //   ))}
    // </select>
  );
};

export default SelType;

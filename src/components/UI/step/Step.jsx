import React, { useEffect, useState } from "react";
import { iconCalendar, arrowLeft } from "../../../assets/images";
import "./Step.css";
import { stepTypes } from "../../../assets/constants";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ru } from "date-fns/locale";
import moment from "moment";
import { format } from "date-fns";

registerLocale("ru", ru);

const Step = ({
  step,
  options,
  onChange,
  onStep,
  pickerDayStart,
  pickerDayEnd,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState(false);
  const [stepValue, setStepValue] = useState(step);
  const [dayPickerisActive, setDayPickerisActive] = useState(false);
  const [startDate, setStartDate] = useState(moment().format("YYYY-MM-DD"));
  const [endDate, setEndDate] = useState(moment().format("YYYY-MM-DD"));

  const handleStep = (value) => {
    setStepValue(value);
    onChange(stepValue);
    console.log("stepValue", stepValue);
  };
  const handleDayStart = (date) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    // console.log("date", formattedDate);
    pickerDayStart(formattedDate);
    setStartDate(formattedDate);
  };

  const handleDayEnd = (date) => {
    // setEndDate(date.toLocaleDateString());
    const formattedDate = format(date, "yyyy-MM-dd");
    console.log("date", formattedDate);
    pickerDayEnd(formattedDate);
    setEndDate(formattedDate);
  };

  const toggleClass = () => {
    setActive(!active);
  };

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleClick = (innerText) => {
    setIsOpen(false);
    toggleClass(!active);
    onChange(innerText);
    console.log(innerText);
  };

  const handlePlus = (value) => {
    setStepValue(value);
    onChange(step);
    onStep("plus");
  };

  const handleMinus = (value) => {
    setStepValue(value);
    onChange(step);
    onStep("minus");
  };

  const handleDatePicker = () => {
    setDayPickerisActive(!dayPickerisActive);
  };

  return (
    <div className="step">
      {isOpen && (
        <div className="step__list">
          <ul>
            {Object.keys(options).map((value, key) => (
              <li
                key={key}
                className={step === value ? "active__mode" : ""}
                onClick={(m) => handleClick(value)}
              >
                {stepTypes[value]}
              </li>
            ))}
            <li onClick={handleDatePicker}>Указать даты</li>
            <li onClick={handleDatePicker}>
              <p className="calendar-days" onClick={handleDatePicker}>
                {" "}
                <span> {startDate} </span> - <span> {endDate} </span>
              </p>
             
              <svg
                className="calendar-icon__step"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 1 13 18"
                fill="none"
              >
                <path
                  d="M14.4 1.63636H13.6V0H12V1.63636H4V0H2.4V1.63636H1.6C0.72 1.63636 0 2.37273 0 3.27273V16.3636C0 17.2636 0.72 18 1.6 18H14.4C15.28 18 16 17.2636 16 16.3636V3.27273C16 2.37273 15.28 1.63636 14.4 1.63636ZM14.4 16.3636H1.6V5.72727H14.4V16.3636Z"
                  fill="currentColor"
                />
              </svg>
            </li>

            {dayPickerisActive && (
              <div>
                <DatePicker
                  value={startDate}
                  onChange={(date) => handleDayStart(date)}
                  placeholderText={startDate}
                  isClearable={true}
                  allowKeyboardControl={true}
                  locale={"ru"}
                />
                <DatePicker
                  value={endDate}
                  onChange={(date) => handleDayEnd(date)}
                  placeholderText={endDate}
                  isClearable={true}
                  allowKeyboardControl={true}
                  locale={"ru"}
                />
              </div>
            )}
          </ul>
        </div>
      )}
      <div className="step__description">
        <span className="step__items" onClick={handleMinus}>
          {/* <img className="arrows arrow__left" src={arrowLeft} alt="arrowLeft" /> */}
          <svg
            width="7"
            height="10"
            viewBox="0 0 7 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="arrows arrow__left"
          >
            <path
              d="M6.175 8.825L2.35833 5L6.175 1.175L5 0L0 5L5 10L6.175 8.825Z"
              fill="currentColor"
            />
          </svg>
        </span>
        {/* <span className="step__items" onClick={handleDatePicker}> */}
        {/* <img className="arrows" src={iconCalendar} alt="iconCalendar" /> */}
        <svg
          className="calendar-icon"
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 16 18"
          fill="none"
        >
          <path
            d="M14.4 1.63636H13.6V0H12V1.63636H4V0H2.4V1.63636H1.6C0.72 1.63636 0 2.37273 0 3.27273V16.3636C0 17.2636 0.72 18 1.6 18H14.4C15.28 18 16 17.2636 16 16.3636V3.27273C16 2.37273 15.28 1.63636 14.4 1.63636ZM14.4 16.3636H1.6V5.72727H14.4V16.3636Z"
            fill="currentColor"
          />
        </svg>
        {/* </span> */}
        <span className="filter" onClick={toggleDropdown}>
          {options[step]}
        </span>
        <span className="step__items" onClick={handlePlus}>
          {/* <img
            className="arrows arrow__right"
            src={arrowLeft}
            alt="arrowRight"
          /> */}
          <svg
            width="7"
            height="10"
            viewBox="0 0 7 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="arrows arrow__right"
          >
            <path
              d="M0.589966 8.825L4.40663 5L0.589966 1.175L1.76497 0L6.76497 5L1.76497 10L0.589966 8.825Z"
              fill="currentColor"
            />
          </svg>
        </span>
      </div>
    </div>
  );
};

export default Step;

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

              <img
                src={iconCalendar}
                className="iconCalendar"
                alt="iconCalendar"
              />
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
          <img className="arrows arrow__left" src={arrowLeft} alt="arrowLeft" />
        </span>
        <span className="step__items" onClick={handleDatePicker}>
          <img className="arrows" src={iconCalendar} alt="iconCalendar" />
        </span>
        <span className="filter" onClick={toggleDropdown}>
          {options[step]}
        </span>
        <span className="step__items" onClick={handlePlus}>
          <img
            className="arrows arrow__right"
            src={arrowLeft}
            alt="arrowRight"
          />
        </span>
      </div>
    </div>
  );
};

export default Step;

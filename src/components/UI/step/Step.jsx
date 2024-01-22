import React, { useEffect, useState } from "react";
import { iconCalendar, arrowLeft } from "../../../assets/images";
import "./Step.css";
import { stepTypes } from "../../../assets/constants";
// import DatePicker  from "react-datepicker" ;
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "../../../components/datePicker/DatePicker";
import MyDatePicker from "../../datePicker/MyDatePicker";

const Step = ({ step, options, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState(false);
  const [stepValue, setStepValue] = useState(step);
  const [dayPickerisActive, setDayPickerisActive] = useState(false);
  const [startDate, setStartDate] = useState("__.__.__");
  const [endDate, setEndDate] = useState("__.__.__");
  const [selectedDay, setSelectedDay] = useState(undefined);
  const [selectedDays, setSelectedDays] = useState([]);

  const [selectedDate, setSelectedDate] = useState(null);

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleChange = (date) => {
    setSelectedDate(date);
    console.log("date", date);
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

  const handlePlus = () => {
    onChange(step);
    console.log("plus" + step);
  };

  const handleMinus = () => {
    onChange(step);
    console.log("minus" + step);
  };

  const handleDatePicker = (date) => {
    setDayPickerisActive(!dayPickerisActive);
    console.log("picker", date);

    setSelectedDay(date);
  };

  const handleDayClick = (day, { selected }) => {
    if (selected) {      
      setSelectedDay(undefined);
      return;
    }
    setSelectedDay(day);
    console.log(selected);
  };


  return (
    <div className="step">
      {isOpen && (
        <div className="step__list">
          <ul>
            {Object.keys(options).map((value, key) => (
              <li
                key={key}
                className={step === value ? "active__mode" : "" }
                onClick={(m) => handleClick(value)}
              >
                {stepTypes[value]}
              </li>
            ))}
            <li onClick={handleDatePicker}>Указать даты</li>
            <li onClick={handleDatePicker}>
              {startDate} - {endDate}{" "}
              {selectedDate && (
                <p>Выбранная дата: {selectedDate.toLocaleDateString()}</p>
              )}
              <img
                src={iconCalendar}
                className="iconCalendar"
                alt="iconCalendar"
              />
            </li>

            {dayPickerisActive && (
              //   <DatePicker startDate={startDate} endDate={endDate}
              // />
              // <MyDatePicker />
              <DatePicker
                selected={selectedDate}
                onChange={handleChange}
                onSubmit={handleChange}
              />
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
          <img className="arrows arrow__right" src={arrowLeft} alt="arrowRight" />
        </span>
      </div>
    </div>
  );
};

export default Step;

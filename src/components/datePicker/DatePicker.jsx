import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { iconCalendar } from "../../assets/images";

function DateRangePicker( {selected, onChange} ) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
console.log(onChange);

  return (
    <div style={{ width: '50%', minWidth: '100px',  maxWidth: '500px' }}>
      <DatePicker
        style={{ width: "100px" }}
        dateFormat="dd.MM.yyyy"
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        isClearable={true}
        placeholderText="____.__.____"

      />
      <DatePicker   
           
        dateFormat="dd.MM.yyyy"
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        isClearable={true}
        placeholderText="____.__.____"
      />     
    </div>
  );
}

export default DateRangePicker;

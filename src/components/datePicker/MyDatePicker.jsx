import { useState } from "react";
import DatePicker from "react-datepicker";
const MyDatePicker = ( dateStart ) => {
  const [selectedDate, setSelectedDate] = useState(null);
  
console.log(dateStart);
  const handleChange = (date) => {
    setSelectedDate(date);
    // console.log("date", date);
  };

  return (
    <div>
      <DatePicker selected={selectedDate} onChange={handleChange} />
      {selectedDate && <p>Выбранная дата: {selectedDate.toLocaleDateString()}</p>}
    </div>
  );
};

export default MyDatePicker;
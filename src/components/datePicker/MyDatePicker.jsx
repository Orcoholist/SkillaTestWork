import { useState } from "react";
import DatePicker from "react-datepicker";
const MyDatePicker = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div>
      <DatePicker selected={selectedDate} onChange={handleChange} />
      {selectedDate && <p>Выбранная дата: {selectedDate.toLocaleDateString()}</p>}
    </div>
  );
};

export default MyDatePicker;
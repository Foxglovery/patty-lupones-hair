import React, { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';

function TestDateTimePicker({selectedDate, setSelectedDate}) {
  

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  }

  return (
    <div>
      <DateTimePicker
        onChange={handleDateChange}
        value={selectedDate}
      />
    </div>
  );
}

export default TestDateTimePicker;

import { useState } from "react";
import DateRangePicker from "./components/DateRangePicker"

const App = () =>  {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date) => {
    console.log('Selected date:', date);
  };

  const handleRangeChange = (start: Date | null, end: Date | null) => {
    setStartDate(start);
    setEndDate(end);
  };
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold underline">
        Demo for Date Range picker
      </h1>
      <DateRangePicker 
        startDate={startDate}
        endDate={endDate}
        onDateChange={handleDateChange}
        onRangeChange={handleRangeChange}
      />
    </div>
  )
}

export default App

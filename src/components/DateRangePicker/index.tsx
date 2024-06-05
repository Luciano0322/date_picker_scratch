import PickerHead from "./PickerHead";
import useMonth from "../../hooks/useMonth";
import Calendar from "./Calendar";
import { zhTW } from "date-fns/locale";
import React, { FC } from "react";

interface DateRangePickerProps {
  startDate: Date | null;
  endDate: Date | null;
  // onDateChange: (date: Date) => void; // Might think merge the date picker & date range together.
  onRangeChange: (start: Date | null, end: Date | null) => void;
}

const DateRangePicker: FC<DateRangePickerProps>  = ({
  startDate,
  endDate,
  // onDateChange,
  onRangeChange,
}) => {
  const {currentMonth, prevMonth, nextMonth} = useMonth();

  return (
    <div className="w-[350px] h-[240px] border-2 overflow-y-scroll">
      <PickerHead currDate={currentMonth} prev={prevMonth} next={nextMonth} />
      <Calendar 
        currentMonth={currentMonth} 
        startDate={startDate}
        endDate={endDate}
        // onDateChange={onDateChange}
        onRangeChange={onRangeChange}
        locale={zhTW}
      />
    </div>
  );
}

export default DateRangePicker;
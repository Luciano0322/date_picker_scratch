import React, { useMemo } from 'react';
import { getDaysInMonth, startOfMonth, addDays, format, Locale, endOfMonth, startOfWeek, subDays, getMonth, isToday, isWithinInterval, isSameDay } from 'date-fns';
import { zhTW } from 'date-fns/locale';

interface CalendarProps {
  currentMonth: Date;
  startDate: Date | null;
  endDate: Date | null;
  onDateChange?: (date: Date) => void;
  onRangeChange: (start: Date | null, end: Date | null) => void;
  locale?: Locale;
}

const Calendar: React.FC<CalendarProps> = ({ 
  currentMonth, 
  startDate,
  endDate,
  onDateChange = (date: Date) => console.log("day click, ", date), 
  onRangeChange,
  locale = zhTW 
}) => {
  const daysInMonth = getDaysInMonth(currentMonth);
  const startDay = startOfMonth(currentMonth);
  const endDay = endOfMonth(currentMonth);

  // Define week days names explicitly to avoid recomputation
  const weekDays = Array.from({ length: 7 }).map((_, index) => 
    format(addDays(startOfWeek(new Date()), index), 'EE', { locale })
  );
  // Calculate previous month's trailing days to fill the start of the calendar
  const prevMonthDaysCount = startDay.getDay();
  const prevMonthDays = Array.from({ length: prevMonthDaysCount }, (_, i) => subDays(startDay, prevMonthDaysCount - i));

  // Calculate next month's leading days to fill the end of the calendar
  const nextMonthDaysCount = 6 - endDay.getDay();
  const nextMonthDays = Array.from({ length: nextMonthDaysCount }, (_, i) => addDays(endDay, i + 1));

  // Generate the current month's days
  const currMonthDays = Array.from({ length: daysInMonth }, (_, i) => addDays(startDay, i));

  const days = useMemo(() => ([
    ...prevMonthDays,
    ...currMonthDays,
    ...nextMonthDays
  ]), [currentMonth]);

  const handleDateClick = (day: Date) => {
    let newStartDate = startDate;
    let newEndDate = endDate;

    if (!newStartDate || (newStartDate && newEndDate)) {
      // If no start date or both start and end dates are selected, set the start date
      newStartDate = day;
      newEndDate = null;
    } else if (day >= newStartDate) {
      // If the clicked date is same as or later than the start date, set it as the end date
      newEndDate = day;
    } else {
      // If the clicked date is earlier than the start date, reset the start date
      newStartDate = day;
      newEndDate = null;
    }

    onRangeChange(newStartDate, newEndDate);
    onDateChange(day);
  };


  const isInRange = (day: Date) => {
    if (startDate && endDate) {
      return isWithinInterval(day, { start: startDate, end: endDate });
    }
    return false;
  };

  return (
    <div className="w-full bg-white border shadow">
      <div className="grid grid-cols-7">
        {weekDays.map((day, index) => (
          <div key={index} className="text-center font-bold">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {days.map((day) => (
          <button
            key={day.toISOString()}
            className={`
            text-center cursor-pointer w-[50px] h-[36px] hover:bg-[#e6e6e6] active:bg-[#006edc]
            ${isToday(day) ? 'bg-[#ffff76]': ''} 
            ${getMonth(day) !== getMonth(currentMonth) ? 'text-[#757575] cursor-not-allowed' : ''}
            ${(startDate && isSameDay(day, startDate)) || (endDate && isSameDay(day, endDate)) ? 'bg-blue-500 text-white' : ''}
            ${isInRange(day) ? 'bg-blue-200' : ''}
            `}
            onClick={() => handleDateClick(day)}
            disabled={getMonth(day) !== getMonth(currentMonth)}
          >
            {format(day, 'd', { locale }) + "日"}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
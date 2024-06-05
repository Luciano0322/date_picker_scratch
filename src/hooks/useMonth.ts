import { useState } from 'react';
import { addMonths, subMonths, startOfMonth } from 'date-fns';

const useMonth = (initialDate: Date = new Date()) => {
  const [currentMonth, setCurrentMonth] = useState<Date>(startOfMonth(initialDate));

  const nextMonth = () => {
    setCurrentMonth(prev => startOfMonth(addMonths(prev, 1)));
  };

  const prevMonth = () => {
    setCurrentMonth(prev => startOfMonth(subMonths(prev, 1)));
  };

  return {
    currentMonth,
    nextMonth,
    prevMonth,
  };
};

export default useMonth;
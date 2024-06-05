import { renderHook, act } from '@testing-library/react-hooks';
import { addMonths, subMonths, startOfMonth } from 'date-fns';
import useMonth from './useMonth';

describe('useMonth', () => {
  it('should initialize with the current month', () => {
    const initialDate = new Date(2024, 5, 10); // June 10, 2024
    const { result } = renderHook(() => useMonth(initialDate));
    
    expect(result.current.currentMonth).toEqual(startOfMonth(initialDate));
  });

  it('should move to the next month', () => {
    const initialDate = new Date(2024, 5, 10); // June 10, 2024
    const { result } = renderHook(() => useMonth(initialDate));

    act(() => {
      result.current.nextMonth();
    });

    expect(result.current.currentMonth).toEqual(startOfMonth(addMonths(initialDate, 1))); // July 1, 2024
  });

  it('should move to the previous month', () => {
    const initialDate = new Date(2024, 5, 10); // June 10, 2024
    const { result } = renderHook(() => useMonth(initialDate));

    act(() => {
      result.current.prevMonth();
    });

    expect(result.current.currentMonth).toEqual(startOfMonth(subMonths(initialDate, 1))); // May 1, 2024
  });
});
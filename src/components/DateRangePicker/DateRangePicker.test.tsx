import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DateRangePicker from '.';

describe('DateRangePicker', () => {
  test('renders DateRangePicker component', () => {
    render(
      <DateRangePicker
        startDate={null}
        endDate={null}
        onRangeChange={jest.fn()}
      />
    );

    // Check render default
    expect(screen.getByText('2024 六月')).toBeInTheDocument();
  });

  test('allows selecting a date range', () => {
    const handleRangeChange = jest.fn();

    render(
      <DateRangePicker
        startDate={null}
        endDate={null}
        onRangeChange={handleRangeChange}
      />
    );

    // normal date select
    const dates = screen.getAllByRole('button');
    fireEvent.click(dates[10]);
    fireEvent.click(dates[20]);

    // check date select is correct
    expect(handleRangeChange).toHaveBeenCalledTimes(2);
  });
  test('resets start date when clicked date is earlier than current start date', () => {
    const handleRangeChange = jest.fn();
    const initialStartDate = new Date(2024, 5, 20); // Assuming this is the current start date
    let startDate: Date | null = initialStartDate;
    let endDate = null;

    const handleRangeChangeWrapper = (start: Date | null, end: Date | null) => {
      startDate = start;
      endDate = end;
      handleRangeChange(start, end);
    };

    const { rerender } = render(
      <DateRangePicker
        startDate={startDate}
        endDate={endDate}
        onRangeChange={handleRangeChangeWrapper}
      />
    );

    const dates = screen.getAllByRole('button');
    
    // Click on a date before the current start date to reset the start date
    fireEvent.click(dates[10]); // Assuming this is a date before 
    
    rerender(
      <DateRangePicker
        startDate={startDate}
        endDate={endDate}
        onRangeChange={handleRangeChangeWrapper}
      />
    );
    // Get the clicked date from the button's text content
    const clickedDateText = dates[10].textContent?.replace('日', '') ?? '';
    const clickedDate = new Date(2024, 5, parseInt(clickedDateText));

    // Check if the start date is reset correctly
    expect(handleRangeChange).toHaveBeenCalledWith(clickedDate, null);
  });
});
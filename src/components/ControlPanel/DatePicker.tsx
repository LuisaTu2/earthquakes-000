import React, { useContext } from "react";
import { DatePicker as DP}  from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DatePicker.css"
import { EarthquakesContext } from "../../context/SearchSettingsContext";

interface DatePickerProps {
  minDate: Date
  maxDate: Date
  date: Date | null
  handleDateChange:  (date: Date | null) => void 
}

const DatePicker: React.FC<DatePickerProps> = ({minDate, maxDate, date, handleDateChange}: DatePickerProps) => {
  const { loading } = useContext(EarthquakesContext)

  return (
      <DP
        selected={date}
        onChange={handleDateChange}
        dateFormat="MMMM d, yyyy"
        showMonthDropdown   
        showYearDropdown    
        dropdownMode="select" // Dropdown instead of scroll
        minDate={minDate}
        maxDate={maxDate} 
        placeholderText="Select a date"
        disabled={loading}
      />
  );
};

export default DatePicker;

import React, { useEffect, useState } from "react"
import { useMediaQuery } from 'usehooks-ts'
import { weekDays } from '../../utils/constants'
import { getDateInState } from '../../utils/date'
import CalendarMonth from "./CalendarMonth"
import styles from './styles.module.css'

interface DatePickerProps {
  modalOpen: boolean,
  closeCalendar: (value: boolean) => void,
  handleSetCalendar2State: (value: string) => void,
  state: string
}

const DateRangePicker: React.FC<DatePickerProps> = ({modalOpen, closeCalendar, handleSetCalendar2State, state}) => {
  const [animateOpen, setAnimateOpen] = useState(false);

  const maxWidth900px = useMediaQuery('(max-width: 900px)')

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [startInput, setStartInput] = useState("");
  const [endInput, setEndInput] = useState("");

  const [leftMonthDate, setLeftMonthDate] = useState(new Date());
  const [rightMonthDate, setRightMonthDate] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth() + 1)
  );

  const handleDateSelect = (date: Date) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
      setStartInput(formatDate(date));
      setEndInput("");
    } else if (date < startDate) {
      setStartDate(date);
      setStartInput(formatDate(date));
    } else {
      setEndDate(date);
      setEndInput(formatDate(date));
    }
  };

  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const parseDate = (value: string): Date | null => {
    const [day, month, year] = value.split("/").map(Number);
    if (!day || !month || !year) return null;
    const date = new Date(year, month - 1, day);
    return isNaN(date.getTime()) ? null : date;
  };

  const formatInputWithSlashes = (value: string): string => {
    const digits = value.replace(/\D/g, '').slice(0, 8);
    const parts = [digits.slice(0, 2), digits.slice(2, 4), digits.slice(4, 8)];
    return parts.filter(Boolean).join('/');
  };

  const handleStartInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatInputWithSlashes(e.target.value);
    setStartInput(formatted);
    const parsed = parseDate(formatted);
    setStartDate(parsed);
  };

  const handleEndInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatInputWithSlashes(e.target.value);
    setEndInput(formatted);
    const parsed = parseDate(formatted);
    setEndDate(parsed);
  };

  const isValidDate = (value: string) => {
    const regex = /^\d{2}\/\d{2}\/\d{4}$/;
    const date = parseDate(value);
    return regex.test(value) && date !== null;
  };

  const getPastDates = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const pastDates: Date[] = [];
    for (let d = new Date(2024, 0, 1); d < today; d.setDate(d.getDate() + 1)) {
      pastDates.push(new Date(d));
    }
    return pastDates;
  };

  const handleApproveDate = () => {
    handleSetCalendar2State((startDate && endDate) ? `${startDate ? formatDate(startDate) : "-"} - ${endDate ? formatDate(endDate) : "-"}` : '')
    closeCalendar(false)
  }

  const handlePrevMonth = () => {
    setLeftMonthDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1));
    setRightMonthDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1));
  };
  
  const handleNextMonth = () => {
    setLeftMonthDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1));
    setRightMonthDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1));
  };

  const isLeftMonthCurrent = () => {
    const now = new Date();
    return (
      leftMonthDate.getFullYear() === now.getFullYear() &&
      leftMonthDate.getMonth() === now.getMonth()
    );
  };

  const handleReset = () => {
    handleSetCalendar2State('')
    setStartDate(null);
    setEndDate(null);
    setStartInput("");
    setEndInput("");
  }

  const monthNames = () => {
    const months = [];
    const now = new Date();

    for (let i = 0; i < 12; i++) {
      const date = new Date(now.getFullYear(), now.getMonth() + i, 1);
      months.push(date);
    }

    return months.map(d => {
      const [m, y] = d.toLocaleString("uk-UA", { month: "long", year: "numeric" }).split(' ')

      return {title: m + ' ' + y, date: d}
    });
  }

  useEffect(() => {
    if (modalOpen) {
      const [dateFrom, dateTo] = state.split(' - ')
      const dateFromFormat = dateFrom ? getDateInState(dateFrom, '/') : null
      const dateToFormat = dateTo ? getDateInState(dateTo, '/') : null

      if (dateFromFormat) {
        setStartDate(dateFromFormat);
        
        setStartInput(formatInputWithSlashes(dateFrom));
      }
      if (dateToFormat) {
        setEndDate(dateToFormat);
        setEndInput(formatInputWithSlashes(dateTo));
      }
      setTimeout(() => setAnimateOpen(true), 10); 
    } else {
      setAnimateOpen(false);
    }
  }, [modalOpen, state]);

  return (
    <div className={styles.modalContent} style={{opacity: animateOpen ? 1 : 0,
      transform: animateOpen ? "scale(1)" : "scale(0.95)",
      transition: "opacity 0.3s ease, transform 0.3s ease"}}>
      {maxWidth900px && (
        <>
          <div className={styles.container}>
            <div className={styles.containerHeader}>
              <button className={styles.footerButton} onClick={() => closeCalendar(false)}>Close</button>
            </div>
            <div className={styles.containerInputs}>
              <label style={{ display: 'flex', flexDirection: 'column'}}>
                <span>Start Date</span>
                <input
                  type="text"
                  placeholder="DD/MM/YYYY"
                  value={startInput}
                  onChange={handleStartInputChange}
                  className={styles.input}
                  style={{
                    width: '100%',
                    borderColor: startInput && !isValidDate(startInput) ? 'red' : '#ccc',
                  }}
                />
              </label>
              <label style={{ display: 'flex', flexDirection: 'column'}}>
                <span>End Date</span>
                <input
                type="text"
                placeholder="DD/MM/YYYY"
                value={endInput}
                onChange={handleEndInputChange}
                className={styles.input}
                style={{
                  width: '100%',
                  borderColor: startInput && !isValidDate(startInput) ? 'red' : '#ccc',
                }}
              />
              </label>
            </div>
          </div>
          <div className={styles.containerCalendar}>
            <div className={styles.containerCalendarDays}>
              {weekDays.map((day, idx) => (
                <div key={idx} style={{ textAlign: "center", fontWeight: "bold" }}>{day}</div>
              ))}
            </div>
            <div>
              <div>
              {
               monthNames().map(({title, date}) => (
                <CalendarMonth
                  key={title}
                  monthDate={date}
                  selectedStart={startDate}
                  selectedEnd={endDate}
                  onSelectDate={handleDateSelect}
                  blockedDates={getPastDates()}
                  onNextMonth={maxWidth900px ? undefined : handleNextMonth}
                  monthName={title}
                />
              ))
            }
              </div>
            </div>
          </div>
        </>
      )}

      {!maxWidth900px && <div className={styles.inputContainer}>
        <div>
          <label>
            <span>Start Date</span>
            <input
              type="text"
              placeholder="DD/MM/YYYY"
              value={startInput}
              onChange={handleStartInputChange}
              className={styles.input}
              style={{
                borderColor: startInput && !isValidDate(startInput) ? 'red' : '#ccc',
              }}
            />
          </label>
          <CalendarMonth
            monthDate={leftMonthDate}
            selectedStart={startDate}
            selectedEnd={endDate}
            onSelectDate={handleDateSelect}
            blockedDates={getPastDates()}
            onPrevMonth={isLeftMonthCurrent() ? undefined : handlePrevMonth}
          />
        </div>
        
        <div>
          <label>
            <span>End Date</span>
            <input
            type="text"
            placeholder="DD/MM/YYYY"
            value={endInput}
            onChange={handleEndInputChange}
            className={styles.input}
            style={{
              borderColor: startInput && !isValidDate(startInput) ? 'red' : '#ccc',
            }}
          />
          </label>
          <CalendarMonth
            monthDate={rightMonthDate}
            selectedStart={startDate}
            selectedEnd={endDate}
            onSelectDate={handleDateSelect}
            blockedDates={getPastDates()}
            onNextMonth={handleNextMonth}
          />
        </div>
      </div>}

      <div className={styles.footer}>
        {!maxWidth900px && <button className={styles.footerButton} onClick={handleReset}>Reset</button>}
        <div style={{display: 'flex', justifyContent: 'end', gap: '5px'}}>
        {!maxWidth900px && <button className={`${styles.footerButton} ${styles.footerCancelButton}`} onClick={() => closeCalendar(false)}>Close</button>}
        {maxWidth900px && <button className={styles.footerButton} onClick={handleReset}>Reset</button>}
          <button className={`${styles.footerButton} ${styles.footerApplyButton}`} onClick={handleApproveDate}>Approve</button>
        </div>
        
      </div>
    </div>
  );
};

export default DateRangePicker;
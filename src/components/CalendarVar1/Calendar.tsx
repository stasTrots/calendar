import { useEffect, useState } from 'react'
import ArrowLeft from '../../assets/arrow-left-svgrepo-com.svg'
import ArrowRight from '../../assets/arrow-right-svgrepo-com.svg'
import { monthNames, weekDays } from '../../utils/constants'
import { getDateInState } from '../../utils/date'
import CustomDropdown from '../CustomSelect/CustomSelect'
import styles from './styles.module.css'

interface CalendarProps {
  closeCalendar: (value: boolean) => void,
  modalOpen: boolean,
  handleSetCalendar1State: (value: string) => void,
  state: string,
}

const getDaysInMonth = (year: number, month: number) => {
  const date = new Date(year, month, 1);
  const days: Date[] = [];

  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  return days;
};

const Calendar: React.FC<CalendarProps> = ({ closeCalendar, modalOpen, handleSetCalendar1State, state }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [animateOpen, setAnimateOpen] = useState(false);
 
  const [currentDate, setCurrentDate] = useState(new Date(today.getFullYear(), today.getMonth()));
  const [selectedRange, setSelectedRange] = useState<{ from: Date | null; to: Date | null }>({
    from: null,
    to: null,
  });

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const days = getDaysInMonth(year, month);
  const firstDayIndex = (days[0].getDay() + 6) % 7;

  const handleSelectDate = (date: Date) => {
    if (date < today) return;

    if (!selectedRange.from || (selectedRange.from && selectedRange.to)) {
      setSelectedRange({ from: date, to: null });
    } else if (selectedRange.from && !selectedRange.to) {
      if (date >= selectedRange.from) {
        setSelectedRange({ ...selectedRange, to: date });
      } else {
        setSelectedRange({ from: date, to: null });
      }
    }
  };

  const isInRange = (date: Date) => {
    const { from, to } = selectedRange;
    if (!from || !to) return false;
    return date >= from && date <= to;
  };

  const yearsRange = Array.from({ length: 25 }, (_, i) => today.getFullYear() + i);

  const handleReset = () => {
    setSelectedRange({ from: null, to: null });
    handleSetCalendar1State('')
  };

  const handleConfirm = () => {
    if (selectedRange.from && selectedRange.to) {
      handleSetCalendar1State(`${selectedRange.from.toLocaleDateString()} - ${selectedRange.to.toLocaleDateString()}`)
    } else {
      handleSetCalendar1State('')
    }
    closeCalendar(false)
  };

 

  useEffect(() => {
    if (modalOpen) {
      const [dateFrom, dateTo] = state.split(' - ')

      setSelectedRange({ from: dateFrom ? getDateInState(dateFrom) : null, to: dateTo ? getDateInState(dateTo) : null })
      setTimeout(() => setAnimateOpen(true), 10); 
    } else {
      setAnimateOpen(false);
    }
  }, [modalOpen, state]);

  return (
    // <div className={styles.modalOverlay}>
      <div className={styles.modalContent}
        style={{
          opacity: animateOpen ? 1 : 0,
          // transform: animateOpen ? "scale(1)" : "scale(0.95)",
          transition: "opacity 0.3s ease, transform 0.3s ease"
        }}
      >
        <div className={styles.calendar}>
          <div className={styles.header}>
            <button className={styles.headerButton} onClick={() => setCurrentDate(new Date(year, month - 1))}>
            <img src={ArrowLeft} className={styles.arrowButton} alt="Arrow left img" />
            </button>

            <div className={styles.selects}>
              <CustomDropdown
                options={monthNames}
                value={monthNames[month]}
                onChange={(val) => {
                  const monthIndex = monthNames.indexOf(val as string);
                  setCurrentDate(new Date(year, monthIndex));
                }}
              />
              <CustomDropdown
                options={yearsRange}
                value={year}
                onChange={(val) => {
                  setCurrentDate(new Date(Number(val), month));
                }}
              />
            </div>

            <button className={styles.headerButton} onClick={() => setCurrentDate(new Date(year, month + 1))}>
              <img src={ArrowRight} className={styles.arrowButton} alt="Arrow left img" />
            </button>
          </div>

          <div className={styles.weekDays}>
            {weekDays.map((day) => (
              <div key={day} className={styles.weekDay}>{day}</div>
            ))}
          </div>

          <div className={styles.days}>
            {Array.from({ length: firstDayIndex }).map((_, i) => (
              <div key={`empty-${i}`} className={styles.day} />
            ))}
            {days.map((date) => {
              const isFrom = selectedRange.from?.toDateString() === date.toDateString();
              const isTo = selectedRange.to?.toDateString() === date.toDateString();
              const isBetween = isInRange(date);
              const isToday = today.toDateString() === date.toDateString();
              const isPast = date < today;

              return (
                <div
                  key={date.toISOString()}
                  className={styles.day}
                  style={{
                    ...(isBetween ? { 
                      backgroundColor: "#90caf959",
                      color: "#000"
                    } : {}),
                    ...(isFrom || isTo ? {
                      backgroundColor: "#1976d2",
                      color: "#fff",
                    } : {}),
                   
                    ...(isToday ? {
                      border: "1px solid #1976d2",
                    } : {}),
                    ...(isPast ? {
                      color: "#aaa",
                      cursor: "not-allowed",
                    } : {}),
                  }}
                  onClick={() => !isPast && handleSelectDate(date)}
                >
                  {date.getDate()}
                </div>
              );
            })}
          </div>

          <div className={styles.footer}>
            <button className={styles.footerButton} onClick={handleReset}>Reset</button>
            <button className={`${styles.footerButton} ${styles.footerCancelButton}`} onClick={() => closeCalendar(false)}>Close</button>
            <button className={`${styles.footerButton} ${styles.footerApplyButton}`} onClick={handleConfirm}>Approve</button>
          </div>
        </div>
      </div>
    // </div>
  );
};

export default Calendar;

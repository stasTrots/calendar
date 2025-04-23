import React from "react"
import { useMediaQuery } from 'usehooks-ts'
import ArrowLeft from '../../assets/arrow-left-svgrepo-com.svg'
import ArrowRight from '../../assets/arrow-right-svgrepo-com.svg'
import { weekDays } from '../../utils/constants'
import styles from './styles.module.css'

interface CalendarMonthProps {
  monthDate: Date;
  selectedStart: Date | null;
  selectedEnd: Date | null;
  onSelectDate: (date: Date) => void;
  blockedDates: Date[];
  onPrevMonth?:() => void;
  onNextMonth?: () => void;
  monthName?: string;
}

const CalendarMonth: React.FC<CalendarMonthProps> = ({
  monthDate,
  selectedStart,
  selectedEnd,
  onSelectDate,
  blockedDates,
  onPrevMonth,
  onNextMonth,
  monthName
}) => {
  const maxWidth900px = useMediaQuery('(max-width: 900px)')

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const generateCalendar = () => {
    
    const year = monthDate.getFullYear();
    const month = monthDate.getMonth();
    const daysInMonth = getDaysInMonth(monthDate);
    const firstDayOfWeek = new Date(year, month, 1).getDay();
    const shift = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
    const days: (Date | null)[] = Array(shift).fill(null);

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const isSameDay = (a: Date, b: Date) => {
    return a.getDate() === b.getDate() && a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear();
  };

  const isInRange = (date: Date) => {
    if (selectedStart && selectedEnd) {
      return date > selectedStart && date < selectedEnd;
    }
    return false;
  };

  const isBlocked = (date: Date) => {
    return blockedDates.some(blocked => isSameDay(date, blocked));
  };

  const days = generateCalendar();

  return (
    <div style={{ width: maxWidth900px ? '100%' : 250, marginTop: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <button disabled={!onPrevMonth} className={styles.headerButton} onClick={onPrevMonth}>
          {onPrevMonth && <img src={ArrowLeft} className={styles.arrowButton} alt="Arrow left img" />}
        </button>

        <div style={{ textTransform: 'capitalize', fontWeight: '600'}}>{monthName ? monthName : monthDate.toLocaleString('uk-UA', { month: "long" })} {!maxWidth900px && monthDate.getFullYear()}</div>

        {onNextMonth ? <button className={styles.headerButton} onClick={onNextMonth}>
              <img src={ArrowRight} className={styles.arrowButton} alt="Arrow left img" />
          </button> : <span />}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: maxWidth900px ? 0 : 4, placeItems: maxWidth900px ? 'center' : 'start' }}>
        {!maxWidth900px && weekDays.map((day, idx) => (
          <div key={idx} style={{ textAlign: "center", fontWeight: "bold" }}>{day}</div>
        ))}
        {days.map((day, idx) => {
          if (!day) return <div key={idx}></div>;
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          const isSelected = (selectedStart && isSameDay(day, selectedStart)) || (selectedEnd && isSameDay(day, selectedEnd));
          const isInSelectedRange = isInRange(day);
          const blocked = isBlocked(day);
          const isToday = today.toDateString() === day.toDateString();

          return (
            <div
              key={idx}
              onClick={() => !blocked && onSelectDate(day)}
              className={styles.day}
              style={{
                backgroundColor: isSelected ? '#1976d2' : isInSelectedRange ? '#bbdefb' : 'transparent',
                color: blocked ? '#ccc' : isSelected ? '#fff' : '#000',
                border: 'none',
                cursor: blocked ? 'not-allowed' : 'pointer',
                ...(isToday ? {
                  border: "1px solid #1976d2",
                } : {}),
              }}
            >
              {day.getDate()}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarMonth;

export const styles: { [key: string]: React.CSSProperties } = {
  button: {
    background: '#fff',
    color: '#000',
    display: 'flex',
    alignItems: 'center',
    gap: 5,
    borderRadius: '24px',
    padding: '0 16px',
    height: '40px',
    border: '1px solid rgb(18, 18, 18)',
    fontWeight: '600',
    transition: '.2s'
  },
  buttonIcon: {
    height: '1em',
    willChange: 'filter',
    transition: 'filter 300ms',
  },
  arrow: {
    height: '1em',
  },
  selects: {
    display: "flex",
    gap: 8,
  },
  weekDays: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    marginBottom: 4,
    fontWeight: "bold",
  },
  weekDay: {
    textAlign: "center",
    padding: "4px 0",
  },
  days: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: 4,
  },
  day: {
    textAlign: "center",
    padding: "8px 0",
    cursor: "pointer",
    borderRadius: 4,
  },
  selectedDay: {
    backgroundColor: "#1976d2",
    color: "#fff",
  },
  rangeDay: {
    backgroundColor: "#90caf9",
    color: "#000",
  },
  today: {
    border: "1px solid #1976d2",
  },
  disabledDay: {
    color: "#aaa",
    cursor: "not-allowed",
  },
};
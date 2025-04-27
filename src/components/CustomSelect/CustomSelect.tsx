import { useEffect, useRef, useState } from "react"
import styles from './styles.module.css'

interface CustomDropdownProps {
  options: string[] | number[];
  value: string | number;
  onChange: (val: string | number) => void;
  icon?: string
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({ options, value, onChange, icon }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  console.log(options, value)
  return (
    <div ref={dropdownRef} className={styles.dropdown}>
      <div
        className={styles.selected}
        style={{
          ...(icon && {paddingLeft: '30px'})
        }}
        onClick={() => setOpen((prev) => !prev)}
      >
        {icon && <img src={icon} className={styles.selectIcon} alt="Calendar img" />}
        {value} 
        <span className={styles.arrow}>▾</span>
      </div>
      {open && (
        <div className={styles.menu}>
          {options.map((opt, i) => (
            <div
              key={i}
              className={styles.option}
              style={{
                ...(opt === value ? {
                  backgroundColor: "#1976d2",
                  color: "#fff",
                } : {})
              }}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
import { useEffect, useRef, useState } from "react"
import styles from './styles.module.css'

interface CustomDropdownProps {
  options: string[] | number[];
  value: string | number;
  onChange: (val: string | number) => void;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({ options, value, onChange }) => {
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

  return (
    <div ref={dropdownRef} className={styles.dropdown}>
      <div
        className={styles.selected}
        onClick={() => setOpen((prev) => !prev)}
      >
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
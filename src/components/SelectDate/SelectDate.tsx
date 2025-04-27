import { useEffect, useState } from 'react'
import { ITimeState } from '../../App'
import calendarSvg from '../../assets/calendar-symbol-svgrepo-com.svg'
import timeIcon from '../../assets/time-svgrepo-com.svg'
import CustomDropdown from '../CustomSelect/CustomSelect'
import styles from './SelectDate.module.css'

interface SelectDateProps {
  openModal: (value: boolean) => void
  title: string
  timeChange: (a: string, b: string) => void
  timeState: ITimeState
}

interface IInputState {
  start: string | null
  end: string | null
}
const SelectDate: React.FC<SelectDateProps> = ({openModal, title, timeChange, timeState}) => {
  const [inputState, setInputState] = useState<IInputState>({
    start: null,
    end: null
  })

  const generateTimeOptions = () => {
    const times: string[] = [];
    for (let hour = 0; hour < 24; hour++) {
      const formattedHour = hour.toString().padStart(2, '0');
      times.push(`${formattedHour}:00`);
    }
    return times;
  };

  const timeOptions = generateTimeOptions();

  useEffect(() => {
    const [start, end] = title.split(' - ')

    setInputState({
      start,
      end
    })
  }, [title])

  return (
    <div>
      <div className={styles.containerInputs}>
        <div style={{ display: 'flex', flexDirection: 'column'}}>
          <span style={{ fontSize: '14px', letterSpacing: '0.8px' }}>Start Date</span>
          <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '10px'  }}>
            <img src={calendarSvg} className={styles.buttonIcon} alt="Calendar img" />
            <input
              type="text"
              placeholder="DD.MM.YYYY"
              value={inputState.start || ''}
              onClick={() => openModal(true)}
              readOnly
              onFocus={(e) => e.target.blur()}
              className={styles.input}
            />
            <CustomDropdown onChange={(value) => timeChange(value.toString(), 'start')} options={timeOptions} value={timeState.start} icon={timeIcon}/>
          </div>
          
        </div>
        <div style={{ display: 'flex', flexDirection: 'column'}}>
          <span style={{ fontSize: '14px', letterSpacing: '0.8px' }}>End Date</span>
          <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '10px' }}>
            <img src={calendarSvg} className={styles.buttonIcon} alt="Calendar img" />
            <input
              type="text"
              placeholder="DD.MM.YYYY"
              value={inputState.end || ''}
              onClick={() => openModal(true)}
              readOnly
              onFocus={(e) => e.target.blur()}
              className={styles.input}
            />
            <CustomDropdown onChange={(value) => timeChange(value.toString(), 'end')} options={timeOptions} value={timeState.end} icon={timeIcon}/>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default SelectDate
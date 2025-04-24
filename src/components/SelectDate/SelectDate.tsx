import { useEffect, useState } from 'react'
import calendarSvg from '../../assets/calendar-symbol-svgrepo-com.svg'
import styles from './SelectDate.module.css'

interface SelectDateProps {
  openModal: (value: boolean) => void,
  title: string
}

interface IInputState {
  start: string | null,
  end: string | null
}
const SelectDate: React.FC<SelectDateProps> = ({openModal, title}) => {
  const [inputState, setInputState] = useState<IInputState>({
    start: null,
    end: null
  })

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
        <label style={{ display: 'flex', flexDirection: 'column', position: 'relative'}}>
          <span style={{ fontSize: '14px', letterSpacing: '0.8px' }}>Start Date</span>
          <img src={calendarSvg} className={styles.buttonIcon} alt="Calendar img" />
          <input
            type="text"
            placeholder="DD.MM.YYYY"
            value={inputState.start || ''}
            onClick={() => openModal(true)}
            className={styles.input}
          />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', position: 'relative'}}>
          <span style={{ fontSize: '14px', letterSpacing: '0.8px' }}>End Date</span>
          <img src={calendarSvg} className={styles.buttonIcon} alt="Calendar img" />
          <input
          type="text"
          placeholder="DD.MM.YYYY"
          value={inputState.end || ''}
          onClick={() => openModal(true)}
          className={styles.input}
        />
        </label>
      </div>
    </div>
  )
}

export default SelectDate
import arrowSvg from '../../assets/arrow-down-svgrepo-com.svg'
import calendarSvg from '../../assets/calendar-symbol-svgrepo-com.svg'
import { styles } from './stylesSeletDate'

interface SelectDateProps {
  openModal: (value: boolean) => void,
  title: string
}
const SelectDate: React.FC<SelectDateProps> = ({openModal, title}) => {
  
  return (
    <button style={styles.button} onClick={() => openModal(true)}>
      <img src={calendarSvg} style={styles.buttonIcon} alt="Calendar img" />
      <span>{title ? title : 'All Days'}</span>
      <img src={arrowSvg} style={styles.arrow} alt="Arrow img" />
    </button>
  )
}

export default SelectDate
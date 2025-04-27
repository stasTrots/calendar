import React, { useState } from "react"
import Calendar from './components/CalendarVar1/Calendar'
import DateRangePicker from './components/CalendarVar2/Calendar'
import SelectDate from './components/SelectDate/SelectDate'

export interface ITimeState {
  start: string
  end: string
}

const App: React.FC = () => {
  const [openCalendar1, setOpenCalendar1] = useState<boolean>(false)
  const [openCalendar2, setOpenCalendar2] = useState<boolean>(false)
  const [calendar1State, setCalendar1State] = useState<string>('')
  const [calendar2State, setCalendar2State] = useState<string>('')
  const [time1State, setTime1State] = useState<ITimeState>({
    start: '00:00',
    end: '00:00'
  })
  const [time2State, setTime2State] = useState<ITimeState>({
    start: '00:00',
    end: '00:00'
  })

  const handleOpenCalendar1 = (value: boolean) => {
    setOpenCalendar1(value)
  }

  const handleOpenCalendar2 = (value: boolean) => {
    setOpenCalendar2(value)
  }

  const handleSetCalendar1State = (value: string) => {
    setCalendar1State(value)
  }

  const handleSetCalendar2State = (value: string) => {
    setCalendar2State(value)
  }

  const handleSetTime1State = (value: string, type: string) => {
    setTime1State(prev => ({
      ...prev,
      [type]: value
    }))
  }

  const handleSetTime2State = (value: string, type: string) => {
    setTime2State(prev => ({
      ...prev,
      [type]: value
    }))
  }

  return (
    <>
      <div style={{ position: 'relative' }}>
        <h2>Variant 1</h2>
        <SelectDate openModal={handleOpenCalendar1} title={calendar1State} timeChange={handleSetTime1State} timeState={time1State}/>
        {openCalendar1 && <Calendar state={calendar1State} modalOpen={openCalendar1} closeCalendar={handleOpenCalendar1} handleSetCalendar1State={handleSetCalendar1State} />}
      </div>
      <hr />
      <div style={{ position: 'relative' }}>
        <h2>Variant 2</h2>
        <SelectDate openModal={handleOpenCalendar2} title={calendar2State} timeChange={handleSetTime2State} timeState={time2State}/>
        {openCalendar2 && <DateRangePicker state={calendar2State} modalOpen={openCalendar2} closeCalendar={handleOpenCalendar2} handleSetCalendar2State={handleSetCalendar2State}/>}
      </div>
    </>
  );
};

export default App;
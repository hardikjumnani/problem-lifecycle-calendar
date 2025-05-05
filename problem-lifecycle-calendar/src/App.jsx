import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Calendar from './components/Calendar'
import Button from './components/Button'

function App() {
  const [count, setCount] = useState(0)

  const handleClick = () => {
    alert('Button clicked!');
  };

  return (
    <>
      <Button label="Add Problem" onClick={handleClick} />
      <Calendar />
    </>
  )
}

export default App

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import SplashScreen from './pages/SplashScreen'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="overflow-hidden">
        <SplashScreen />
      </div>
    </>
  )
}

export default App

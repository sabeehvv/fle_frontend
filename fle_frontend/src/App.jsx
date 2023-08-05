import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './pages/HomePage';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <div>
      <Navbar />
      <h1>Welcome to My Navigation App</h1>
    </div>
  )
}

export default App

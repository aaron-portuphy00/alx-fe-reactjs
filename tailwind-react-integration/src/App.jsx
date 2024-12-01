import { useState } from 'react'
import './App.css'
import UserProfile from './components/UserProfile'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <UserProfile />
    </>
  )
}

export default App

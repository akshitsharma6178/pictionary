// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { Drawer } from './components/drawer/drawer'
import { Chat } from './components/chat/chat'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <div className="main-body">
        <Drawer/>
        <Chat/>
      </div>
    </>
  )
}

export default App

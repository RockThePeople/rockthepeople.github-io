import { useEffect, useRef } from 'react'
import { initSocket } from './Socket.jsx'

function App() {

  const socketRef = useRef(null);
  initSocket(socketRef)

  return (
    <>
      <div>
      
      </div>
    </>
  )
}

export default App

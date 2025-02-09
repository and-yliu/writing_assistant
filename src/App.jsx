import { useState } from 'react'
import './App.css'
import Header from './components/header'
import Content from './components/Content'

function App() {
  const [count, setCount] = useState(0)
  return (
    <>
      <div className='main'>
          <div className='gradient'/>
      </div>

      <div className='app'>
        <Header />
        <Content />
      </div>
    </>
    
  )
}

export default App

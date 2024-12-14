
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './components/HomePage'
import Signup from './components/Signup'


function App() {
 

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/signup' element={<Signup/>} />
      <Route path='/' element={<HomePage/>} />
    </Routes>
    </BrowserRouter>
     
    </>
  )
}

export default App


import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './components/HomePage'
import Signup from './components/Signup'
import ProtectedRoute from './components/ProtectedRoute'


function App() {
 

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/signup' element={<Signup/>} />
      
      <Route path='/' element={<ProtectedRoute/>} >
        <Route path='' element={<HomePage/>} />
      </Route>
    </Routes>
    </BrowserRouter>
     
    </>
  )
}

export default App

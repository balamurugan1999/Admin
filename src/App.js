import './App.css'
import AboutUs from './Components/AboutUsPage'
import Forms from './Components/FormsPage'
import HomePage from './Components/HomePage'
import Login from './Components/LoginPage'
import { Route, Routes } from 'react-router-dom'
import {useState } from 'react'
import Unauthorized from './Components/UnauthorizedPage'
import Error from './Components/ErrorPage'
import { boolean } from 'yup'

function App() {
  const[auth,setAuth]=useState(false)
  let Auth = boolean
  if(auth === true)
  {
  localStorage.setItem('Auth',true)
  }
  Auth = localStorage.getItem('Auth')
  return (
    <>
      <Routes>
        <Route exact path='/' element={<Login auth={setAuth}/>}></Route>
        <Route exact path='/home' element={ Auth === 'true'? <HomePage /> : <Unauthorized />}></Route>
        <Route exact path='/forms'  element={ Auth ==='true'? <Forms /> : <Unauthorized />}></Route>
        <Route exact path='/aboutus' element={Auth === 'true' ? <AboutUs /> : <Unauthorized />}></Route>
        <Route path="*" element={<Error />}></Route>

      </Routes>
    </>
  );
}

export default App;

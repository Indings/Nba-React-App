import {Navbar} from './components/NavBar'
import {Route, Routes} from "react-router-dom"
import Home from "./pages/Home"
import Account from "./pages/Account"
import { useEffect, useState } from 'react'

import './App.css'

function App() {
  const [isLoggedIn,setIsLoggedIn] = useState(false)
  
  return(
    <>  
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<Account isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} />
      </Routes>
    </>
  )

}

export default App

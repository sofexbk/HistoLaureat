import React from 'react'
import { useLogout } from '../hooks/useLogout'

function Navbar() {
    const {logout}=useLogout();
    
    const handlLogout=()=>{
        logout();
    }
  return (
    <>
    <div>Navbar</div>
    <button onClick={handlLogout}>Logout</button>
    </>


  )
}

export default Navbar
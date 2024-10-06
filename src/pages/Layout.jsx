import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
const Layout = ({files,setFiles,searchTerm,setSearchTerm}) => {
  return (
    <>
   <div  className= "main" >
      <Navbar files={files} setFiles={setFiles} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
      <Outlet/>
      
    </div>
    
    
    
    </>
  )
}

export default Layout
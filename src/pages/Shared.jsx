import React, { useEffect, useState } from 'react'
import axiosConfig from '../Config/AxiosConfig'
import SharedFile from '../components/SharedFile'
import SharedFolder from '../components/SharedFolder'
const Shared = (user) => {
  const[sharedFiles,setSharedFiles]=useState([])
  const[sharedFolders,setSharedFolders]=useState([])
  //here we have to make a call to two endpoints, one of which will return a list of shared folder and the other which will return a list of shared files.
  const getSharedFiles=async()=>{
    const res=await axiosConfig.get("/shared");
    setSharedFiles(res.data)
  }
  const getSharedFolders=async()=>{
    const res=await axiosConfig.get("/sharedFolders")
    setSharedFolders(res.data)

  }
  useEffect(()=>{
    getSharedFiles();
    getSharedFolders();
  },[])
  
  return (
    <>
    <div style={{display:"flex", flexDirection:"column"}}>

    <div style={{width:"100vw",height:"90vh", display:"flex", flexDirection:"column", alignItems:"center",paddingTop:"30px", overflow:"hidden"}}>  
    {sharedFiles?.map((file,index)=><SharedFile key={index} data={file} curUser={user}/>)} 
    </div>
    <div>
    {sharedFolders?.map((file,index)=><SharedFolder key={index} data={file}/>)}
    </div> 
    </div>


    </>
  )
}

export default Shared
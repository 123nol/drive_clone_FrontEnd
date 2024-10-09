import React from 'react'
import File from '../components/File'
import axiosConfig from '../Config/AxiosConfig'

import { useEffect,useState } from 'react'
import ContentList from '../components/ContentList'
import Folder from '../components/Folder'
import Divider from '@mui/material/Divider'



const Landing = ({token,files,setFiles,getFiles,folders,setFolders,getFolders,searchTerm,getFolderFiles}) => {
  // const[files,setFiles]=useState([])
  // const chosenFiles = files?.filter((val)=>
  //   {if(searchTerm==""){
  //     return val
  //   }
  //   else if(val?.fileName.toLowerCase().includes(searchTerm.toLowerCase()))
  //     return val
  
  //   })
  
  
  // const getFiles=async()=>{
  //   try
  //   {
  //     const response=await axiosConfig.get("/home/user/alldocs")
  //     setFiles(response.data)
  //     console.log(response.data)
  //     // console.log(files)

      
  //     // console.log(files)
  //   }
  //   catch(err){
  //     console.log(err)
  //   }
  // }
  
  useEffect(()=>{
   
    
    getFiles();
    getFolders();
  
},[])
// .filter((val)=>
//   {if(searchTerm==""){
//     return val
//   }
//   else if(val?.fileName.toLowerCase().includes(searchTerm.toLowerCase()))
//     return val

//   })

  return (

  //   <div style={{width:"100vw",height:"90vh", display:"flex", flexDirection:"column", alignItems:"center",paddingTop:"30px", overflow:"hidden"}}>
  //    {/* added a filter for the shit the user searches for in the search bar */}
  //   {/* {files?.filter((val)=>
  // {if(searchTerm==""){
  //   return val
  // }
  // else if(val?.fileName.toLowerCase().includes(searchTerm.toLowerCase()))
  //   return val

  // }).map((file,index)=><File key={index} data={file} folders={folders} />)}  */}
     

  //   </div>
  <div style={{display:"flex",flexDirection:"column",gap:"20px",paddingTop:"40px"}}>
    <div style={{width:"100vw",height:"fit-content", display:"flex", flexDirection:"row", justifyContent:"flex-start",paddingLeft:"180px",paddingRight:"180px", overflow:"hidden", flexWrap:"wrap"}}>{folders?.map((folder,index)=> <Folder key={index} data={folder} getFolderFiles={getFolderFiles}/>)}</div>
    
    
  <ContentList chosenFiles={files} folders={folders}/>

  </div>
  )
}

export default Landing
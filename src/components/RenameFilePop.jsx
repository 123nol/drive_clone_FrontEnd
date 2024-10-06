import React from 'react'
import { useState } from 'react'
import axiosConfig from '../Config/AxiosConfig'
import { Paper } from '@mui/material'
import {TextField} from '@mui/material'
import {Button} from '@mui/material'


const RenameFilePop = ({fileId,fOut,setfOut}) => {
  const [fileName, setfileName]=useState("")
  const[error,setError]=useState(false)
  const handleFolderRename=async()=>{
    try
    {if(fileName==null){
      setError(true)
      return
    }
    const res=await axiosConfig.post("/home/user/renameFile",{"id":fileId,"newName":fileName})
    
  }
    
    catch(err){
      console.log(err)
    }
    




  }
  return (
    <Paper elevation={5} style={{display:fOut?"block":"none" ,width:"320px",height:"250px", padding: "30px", position:"fixed", top:"0px", bottom:"0",right:"0px", left:0, margin:"auto",zIndex:"100"}}>
    <h1>Rename File</h1>
    <br/>
    <TextField error={error} name="folder" id="standard-basic" label="New Name" variant="outlined" onChange={(e)=>setfileName(e.target.value)} value={fileName}  fullWidth/>
    <br/>
    <div className='cancel_create' style={{display:"flex", flexDirection:"row-reverse", width:"fit-content", marginTop:"50px"}}>
    <Button onClick={()=>{setfOut(false)
      setfileName("");
    }} >Cancel</Button>
    <Button onClick={handleFolderRename} >Rename</Button>

    </div>
  
  
    

  </Paper>
  

)
}


export default RenameFilePop
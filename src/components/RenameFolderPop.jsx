import React from 'react'
import { Paper } from '@mui/material'
import { TextField } from '@mui/material'
import { useState } from 'react'
import Button from '@mui/material/Button';
import axiosConfig from '../Config/AxiosConfig';


const RenameFolderPop = ({folderId,rOut,setrOut}) => {
  const [folderName, setFolderName]=useState("")
  const[error,setError]=useState(false)
  const handleFolderRename=async()=>{
    try
    {if(folderName==null){
      setError(true)
      return
    }
    const res=await axiosConfig.post("/home/user/renameFolder",{"id":folderId,"newName":folderName})
    
  }
    
    catch(err){
      console.log(err)
    }
    




  }
  return (
    <Paper elevation={5} style={{display:rOut?"block":"none" ,width:"320px",height:"250px", padding: "30px", position:"fixed", top:"0px", bottom:"0",right:"0px", left:0, margin:"auto",zIndex:"100"}}>
    <h1>Rename Folder</h1>
    <br/>
    <TextField error={error} name="folder" id="standard-basic" label="Untitled Folder" variant="outlined" onChange={(e)=>setFolderName(e.target.value)} value={folderName}  fullWidth/>
    <br/>
    <div className='cancel_create' style={{display:"flex", flexDirection:"row-reverse", width:"fit-content", marginTop:"50px"}}>
    <Button onClick={()=>{setrOut(false)
      setFolderName("");
    }} >Cancel</Button>
    <Button onClick={()=>{handleFolderRename();}} >Create</Button>

    </div>
  
  
    

  </Paper>
  

)
}

export default RenameFolderPop
import React from 'react'
import { Paper } from '@mui/material'
import { TextField } from '@mui/material'
import { useState } from 'react'
import Button from '@mui/material/Button';
import axiosConfig from '../Config/AxiosConfig';
const FolderPop = (props) => {
  const [folderName, setFolderName]=useState("")
  const handleFolderUpload=async()=>{
    try
    {if(folderName==null){
      setFolderName("Untitled Folder")
    }
    const res=await axiosConfig.post("/home/user/createFolder",{"name":folderName})
    props.setFolders([...props.folders,res.data])
  }
    
    catch(err){
      console.log(err)
    }
    




  }
  return (

    
      <Paper elevation={5} style={{display:props.folder?"block":"none" ,width:"320px",height:"250px", padding: "30px", position:"fixed", top:"0px", bottom:"0",right:"0px", left:0, margin:"auto",zIndex:"100"}}>
        <h1>New Folder</h1>
        <br/>
        <TextField name="folder" id="standard-basic" label="Untitled Folder" variant="outlined" onChange={(e)=>setFolderName(e.target.value)} value={folderName}  fullWidth/>
        <br/>
        <div className='cancel_create' style={{display:"flex", flexDirection:"row-reverse", width:"fit-content", marginTop:"50px"}}>
        <Button onClick={()=>{props.setFolder(false);
          setFolderName("");
        }} >Cancel</Button>
        <Button onClick={()=>{handleFolderUpload();
        props.setFolder(false);

        }} >Create</Button>

        </div>
      
      
        

      </Paper>
      
    
  )
}

export default FolderPop
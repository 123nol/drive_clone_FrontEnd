import React, { useState } from 'react'

import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';
import axiosConfig from '../Config/AxiosConfig';
import { Paper } from '@mui/material';
import {Button} from '@mui/material';


const MovePop = ({file,pop,setPop,folders}) => {
  const[folderId, setFolderId]=useState()
  const[folderName,setFolderName]=useState("")
  const[fileId,setFileId]=useState()
 
  
  const handleMove= async()=>{
    try{
      

      if( folderId!=null && file!=null){
      const res = await axiosConfig.post("/home/user/move",{"fileId":file,"folderId":folderId})
      console.log(typeof folderId)
      console.log(typeof file)
    }
    else{
    console.log("id is null")
    }
  }
    catch(err){
      console.log(err)
    }
  }
  return (
    <div>
       <Paper elevation={3} style={{display:pop?"block":"none" ,width:"400px",height:"fit-content", padding: "30px", position:"fixed", top:"0px", bottom:"0",right:"0px", left:0, margin:"auto",zIndex:"100"}}>
        <h3 style={{fontWeight:"400"}}>Selected Folder:<span style={{fontSize:"18px",fontWeight:"550"}}> {folderName}</span> </h3>

        <br/>


        {/* <TextField name="folder" id="standard-basic" label="Untitled Folder" variant="outlined" onChange={(e)=>setFolderName(e.target.value)} value={folderName}  fullWidth/> */}
        <div style={{display:'flex', flexDirection:'column', alignItems:"flex-start", justifyContent:"flex-start", height:"300px", overflowY:"scroll",width:"100%", background:"lightgrey",padding:"10px"}}>
        {folders?.map((folder, index)=>{
          return(
            <div style={{display:"flex", justifyContent:"center", alignItems:"center", width:"fit-content", gap:"8px", minHeight:"50px", cursor:"pointer"}} onClick={()=>{
              setFolderName(folder.folderName);
              setFolderId(folder.id);
            }}>
            <FolderOpenOutlinedIcon/>
            <h3>{folder.folderName}</h3>
      
          </div>

          )
        })}
        </div>



        <br/>
        <div className='cancel_create' style={{display:"flex", flexDirection:"row-reverse", width:"fit-content", marginTop:"50px", height:'80px'}}>
        <Button onClick={()=>{setPop(false)
          setFolderName("");
          setFolderId({})
        }} >Cancel</Button>
        <Button onClick={()=>{handleMove}} >Move</Button>

        </div>
        </Paper>
    </div>
    
  )
}

export default MovePop
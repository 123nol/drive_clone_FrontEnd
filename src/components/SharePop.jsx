import React, { useState } from 'react'
import { Paper } from '@mui/material'
import axiosConfig from '../Config/AxiosConfig'

const SharePop = ({fileId,pOut,setpOut}) => {
  const[reciever,setReciever]=useState("")
  const[error,setError]=useState(false)
  const handleShare=async()=>{
    if (reciever==null){
      setError(true)
      return

    }
    const res=await axiosConfig.post("/home/user/share",{
      "userEmail":reciever,
      "fileId":fileId,
      "allPerm":true
    })
    setpOut(false)
  }
  // you can add a checklist that specifies the permission granted to the user that is receiving it

  return (
    <Paper elevation={5} style={{display:pOut?"block":"none" ,width:"320px",height:"250px", padding: "30px", position:"fixed", top:"0px", bottom:"0",right:"0px", left:0, margin:"auto",zIndex:"100"}}>
    <h1>Share To</h1>
    <br/>
    <TextField error={error} name="folder" id="standard-basic" label="User Email" variant="outlined" onChange={(e)=>setReciever(e.target.value)} value={reciever}  fullWidth/>
    <br/>
    <div className='cancel_create' style={{display:"flex", flexDirection:"row-reverse", width:"fit-content", marginTop:"50px"}}>
    <Button onClick={()=>{setpOut(false)
      setReciever("");
    }} >Cancel</Button>
    <Button onClick={handleShare} >Create</Button>

    </div>
  
  
    

  </Paper>
  )
}

export default SharePop
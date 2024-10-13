import React, { useState } from 'react'
import { Paper } from '@mui/material'
import axiosConfig from '../Config/AxiosConfig'
import {Button} from '@mui/material'
import {TextField} from '@mui/material'

import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';


const SharePop = ({fileId,pOut,setpOut,caller,data}) => {
  const[reciever,setReciever]=useState("")
  const[error,setError]=useState(false)
  // const[shareDetails,setSharedDetails]=useState([...data?.shared])


  const [checked, setChecked] = React.useState(true);

 

  const shareDetails=data?.shared;
  
  const handleRemoveAccess=(email)=>{
    try{
      const res=axiosConfig.post("/home/user/removeAccess", {
        "removeEmail": email,
        "fileId":data?.id
      })
    }
    catch(err){
      console.log(err)
    }
  }


  const handleChange = (event) => {
    setChecked(event.target.checked);
  };



  const handleShare=async()=>{
    if (reciever==null){
      setError(true)
      return

    }
    
    try{
      if(caller=="file")
      {const res=await axiosConfig.post("/home/user/share",{
      "userEmail":reciever,
      "fileId":fileId,
      "allPerm":checked
    })}
    else{
      const res=await axiosConfig.post("/home/user/shareChosenFolder",{
        "userEmail":reciever,
        "folderId":fileId,
        "allPerm":checked
      })

    }
    setpOut(false)}
    catch(err)
    {
      console.log(err)
    }
  }
  // you can add a checklist that specifies the permission granted to the user that is receiving it

  return (
    <Paper elevation={5} style={{display:pOut?"block":"none" ,width:"550px",height:"fit-content", padding: "30px", position:"fixed", top:"0px", bottom:"0",right:"0px", left:0, margin:"auto",zIndex:"100"}}>
    <h1>Share To</h1>
    <br/>
    <TextField error={error} name="folder" id="standard-basic" label="User Email" variant="outlined" onChange={(e)=>setReciever(e.target.value)} value={reciever}  fullWidth/>
    <br/>
    <FormControlLabel 
    control={<Checkbox
      checked={checked}
      onChange={handleChange}
      
      inputProps={{ 'aria-label': 'controlled' }}
    />} label="Allow Rename and Share also"/>
    <br/>
    <div style={{display:"flex", flexDirection:"column", width:"100%",alignItems:"flex-start", justifyContent:"center",height:"fit-content",margin:"5px"}}>
      
      <h4>
        Owner
        <br/>
        <span style={{fontWeight:"200"}}>{data?.ownerEmail}</span>

      </h4>
      <h4>
        People with access: <br/>
        {data?.shared.map(shareDetail=>{
        return (
         <div style={{minWidth:"90%",textAlign:"center",height:"100%",display:"flex", gap:"7px",position:"relative"}}>
         <div style={{background:"black", borderRadius:"100%",minWidth:"10%",minHeight:"50%"}}>
            
         </div>
         <div>
           {shareDetail?.user}

         
         </div>
         <Button variant="outlined" color="error" style={{position:"absolute", right:"2px"}} onClick={() =>{ handleRemoveAccess(shareDetail?.user);}}>
        Remove
      </Button>
       </div>
       

      );})
        
        
       
        }
      </h4>
      
     

    </div>
    <br/>
    <div className='cancel_create' style={{display:"flex", flexDirection:"row-reverse", width:"fit-content", marginTop:"50px"}}>
    <Button onClick={()=>{setpOut(false);
      setReciever("");
    }} >Cancel</Button>
    <Button onClick={()=>{handleShare();}} >Create</Button>

    </div>
  
  
    

  </Paper>
  )
}

export default SharePop
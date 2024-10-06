import React from 'react'
import Paper from '@mui/material/Paper';
import { Chip } from '@mui/material';
import FaceIcon from '@mui/icons-material/Face';
import LockIcon from '@mui/icons-material/Lock';
import Switch from '@mui/material/Switch';
import { useState } from 'react';
import Login from '../components/Login';
import Register from '../components/Register'
const AuthPage = ({logged,setLogged,token,setToken}) => {
  const [checked, setChecked] = useState(false);
  return (
    <div style={{display:"flex",justifyContent:"center", alignContent:"center",width:"100%",padding:"50px",textAlign:"center"}}>
      <Paper elevation={3} style={{width:"30%", minWidth:"500px",padding: "30px"}}>
        
       {checked ? <Chip icon={<LockIcon />} label="Log in" color="primary" variant="outlined" />:
        
        
        <Chip icon={<FaceIcon />} label="Sign in" color="primary" variant="outlined" />}
        <br/>
        <Switch
      checked={checked}
      onChange={(e)=>setChecked(!checked)}
      inputProps={{ 'aria-label': 'controlled' }}
    />

        {checked?<Login logged={logged} setLogged={setLogged} token={token} setToken={setToken}/> : <Register logged={logged} setLogged={setLogged} token={token} setToken={setToken}/>}
      </Paper> 
    </div>
    
    
    
    
  
  )
}

export default AuthPage
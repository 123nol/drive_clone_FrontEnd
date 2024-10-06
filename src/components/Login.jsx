import React from 'react'
import { TextField } from '@mui/material'
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';

import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';

import FormControl from '@mui/material/FormControl';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login'
import { useState } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const Login = ({logged,setLogged,token,setToken}) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const[form,setForm]=useState({"email":"","password":""})
  const[error,setError]=useState({emailError:false,passwordError:false})
  const[valid,setValid]=useState(true)
  const navigate=useNavigate();

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleChange=(e)=>setForm({...form, [e.target.name]:e.target.value})
  const isEmail = (email) =>/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
  const handleEmail=()=>{
    let email=form.email
    if(!isEmail(email)){
      setError({...error,emailError:true})
      

    }
    else{
      setError({...error,emailError:false})
    }
    }
    const handlePass=()=>{
      const pass=form.password
      if(!pass||pass.length<8 ){
        setError({...error,passwordError:true})
        
  
      }
      else{
        setError({...error,passwordError:false})
      }
      }
      const handleSubmit=async(e)=>{
        e.preventDefault()
        if(error.emailError||error.passwordError||!form.email||!form.password){
          setValid(false)
          return

        }
        try{
          const res= await axios.post("http://localhost:8080/home/public/login", {...form});
          
          if(res.status!==200 || res.data.token===null){
            setValid(false)
            return
          }
          localStorage.setItem("token",res.data.token)
          setToken(res.data.token)
          
          setLogged(true) 
          navigate("/home/user")
          


        }
        catch(err){
          console.log(err);
          if(err.status===403){
            setValid(false)

          }
        }
      }

  return (
    <div style={{width:"100%",display:"flex",flexDirection:"column", gap:"15px"}}>
      {/* <p>
      <TextField id="standard-basic" label="Email" variant="standard" fullwidth/>
      </p>
      <p>
      <TextField id="standard-basic" label="Password" variant="standard" fullwidth/>
      </p> */}
      
      <TextField name="email" id="email" label="Email" variant="standard" onChange={handleChange} value={form.email} onBlur={handleEmail} error={error.emailError} fullWidth/>
      
      
      <FormControl sx={{ width: '100%' }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
          <Input
          name="password"
          fullWidth
          value={form.password}
          onChange={handleChange}
            id="standard-adornment-password"
            type={showPassword ? 'text' : 'password'}
            onBlur={handlePass}
            error={error.passwordError}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      
      <p>
      <Button  onClick={handleSubmit} type="submit" variant="contained" endIcon={<LoginIcon />}>
        Submit
      </Button>
      </p>
      {!valid&&<p style={{textAlign:"start"}}><Alert fullWidth severity="warning">
        <AlertTitle>Notice</AlertTitle>
        The Form is not properly completed
      </Alert></p>}

    </div>
  )
}

export default Login

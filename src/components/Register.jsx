import React, { useState } from 'react'
import { TextField } from '@mui/material'
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';

import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';

import FormControl from '@mui/material/FormControl';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import Login from '@mui/icons-material/Login'
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

const Register = ({logged,setLogged}) => {
  const navigate=useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  // const [firstName, setFirstName]=useState("")
  // const [LastName,setLastName]=useState("")
  // const [password,setPassword]=useState("")
  // const [email, setEmail]=useState("")
  const[form,setForm]=useState({firstName:"",lastName:"",email:"",password:""})
  

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleChange=(e)=>setForm({...form, [e.target.name]:e.target.value})
  const[error,setError]=useState({firstNameError:false,lastNameError:false,emailError:false,passwordError:false})
  const[valid,setValid]=useState(true)
  const handleFname=()=>{
    let fname=form.firstName
    if(!fname||fname.length<2 || fname.length>10){
      setError({...error,firstNameError:true})
      

    }
    else{
      setError({...error,firstNameError:false})
    }
    }
    const handleLname=()=>{
      let lname=form.lastName
      if(!lname||lname.length<2 || lname.length>10){
        setError({...error,lastNameError:true})
        
  
      }
      else{
        setError({...error,lastNameError:false})
      }
      }
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
            if(error.emailError||error.firstNameError||error.lastNameError||error.passwordError||!form.firstName||!form.lastName||!form.email||!form.password){
              setValid(false)
              return

            }
            try{
              const res= await axios.post("http://localhost:8080/home/public/register", {...form});
              localStorage.setItem("token",res.data.token)
              
              if(res.status!==200 || res.data.token===null){
                setValid(false)
                return
              }
              
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
    

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <div style={{width:"100%",display:"flex",flexDirection:"column", gap:"15px"}}>
      <p>
      <TextField id="firstname" error={error.firstNameError} name="firstName" label="First Name" variant="standard" value={form.firstName} onChange={handleChange} onBlur={handleFname} fullWidth/>
      </p>
      <p>
      <TextField id="lastname" error={error.lastNameError} name="lastName" label="Last Name" variant="standard" value={form.lastName} onBlur={handleLname} onChange={handleChange}fullWidth/>
      </p>
      <p>
      <TextField id="email" name="email" label="Email" variant="standard" value={form.email} onChange={handleChange} onBlur={handleEmail} error={error.emailError}fullWidth />
      </p>
      <p>
      <FormControl sx={{ width: '100%' }} variant="standard" >
          <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
          <Input
            id="standard-adornment-password"
            type={showPassword ? 'text' : 'password'}
            name='password'
            value={form.password}
            onChange={handleChange}
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
          fullWidth/>
        </FormControl>
      </p>
      <p>
      <Button fullwidth type="submit"variant="contained" endIcon={<Login />} onClick={handleSubmit}>
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

export default Register
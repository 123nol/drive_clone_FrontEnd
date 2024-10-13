import React, { useState } from 'react'
import { Paper } from '@mui/material'
import { styled, alpha } from '@mui/material/styles';
import Divider from '@mui/material/Divider'
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import { PictureAsPdfOutlined } from '@mui/icons-material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';

import ArchiveIcon from '@mui/icons-material/Archive';


import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';


import axiosConfig from '../Config/AxiosConfig';

import { StyledMenu } from './StyledMenu';

{/* <Divider sx={{ my: 0.5 }} /> */}

const TrashFile =  ({data}) => {

  const [anchorEl, setAnchorEl] = React.useState(null);
 
  const opened = Boolean(anchorEl);

  const handleRecover=async()=>{
    try
   { const res=await axiosConfig.post("/home/user/recoverFile",{
      fileId:data.id
    })
}
catch(err){
  console.log(err);
}
  }
  



 
  const handleClick = (event) => {
    event.stopPropagation(); 
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    
    setAnchorEl(null);
  };

  return (
    <div style={{position:'relative',minWidth:"1500px"}}>
    
      <div style={{minWidth:"70%", display:"flex", borderBottom:"solid grey 0.2px ",height:"50px",alignItems:"center",fontSize:"13px",overflowX:"hidden"} } className='singleFile'>
        <div style={{minWidth:"40%",backgroud:"red",display:"flex", alignItems:"center",gap:"5px"}}>
          <PictureAsPdfOutlined/>
          <p >
            {data?.fileName}
          </p>
        
          
         
        </div>
        <div style={{minWidth:"10%", }} >
          {data?.lastModifiedDate.substring(0,10)}
        </div>
        <div style={{minWidth:"20%",textAlign:"center",height:"100%",display:"flex",alignItems:"center", gap:"7px"}}>
          <div style={{background:"black", borderRadius:"100%",minWidth:"10%",minHeight:"50%"}}>
              {/* image */}
          </div>
          <div>
            {data?.ownerEmail}
          </div>
        </div>
        <div style={{width:"60px"}}>
          {Math.floor(data?.size/1000)} KBs
        </div>
        <div style={{width:"fit-content",marginLeft:"100px",display:"flex",justifyContent:"center",alignItems:"center",gap:"7px"}}>
        <FolderOpenOutlinedIcon/>
            {data?.location}
          </div>
        <IconButton
        onClick={handleClick}
        style={{position:"absolute", right:"2px"}}
        >
          <MoreVertIcon/>
        </IconButton>
        <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={opened}
        onClose={handleClose}
        
      >
       
        <Divider sx={{ my: 0.5 }} />
        {/* <MenuItem onClick={handleClose} disableRipple>
          <FileCopyIcon />
          Duplicate
        </MenuItem>
        <Divider sx={{ my: 0.5 }} /> */}
        
        <MenuItem onClick={()=>{
          handleClose();
          handleRecover();
          
          }} disableRipple>
          <ArchiveIcon />
          Recover
        </MenuItem>
        
        <MenuItem onClick={()=>{
          handleClose();
        
          }} disableRipple>
          <ArchiveIcon />
          Delete
        </MenuItem>
        
      </StyledMenu>
        

      </div>
      

   


    </div>
  )
}

export default TrashFile
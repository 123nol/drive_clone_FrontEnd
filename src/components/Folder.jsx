import React from 'react'
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { StyledMenu } from './StyledMenu';


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
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';


import RenameFilePop from './RenameFilePop';
import SharePop from './SharePop';


const Folder = ({data,getFolderFiles}) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [fOut,setfOut]=useState(false)

  const[pOut,setpOut]=useState(false)
  const opened = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  return (
   
    <div style={{display:"flex", justifyContent:"space-between", alignItems:"center",  width:"250px", height:"fit-content",cursor:"pointer", backgroundColor:"lightgrey",transition:"all 0.2s ease-in-out", padding:"15px", position:"relative", margin:"5px",borderRadius:"10px"}} onDoubleClick={()=>{
      
      getFolderFiles(data.id);
    navigate(`/home/user/Folders/${data.folderName}`) ;

    } 
  } >
    <div style={{width:"100px", display:"flex", justifyContent:"space-around", alignItems:"center",}}>
    <FolderOpenOutlinedIcon/>
    <h3>{data.folderName}</h3>
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
       
        
        {/* <MenuItem onClick={handleClose} disableRipple>
          <FileCopyIcon />
          Duplicate
        </MenuItem>
        <Divider sx={{ my: 0.5 }} /> */}
        <MenuItem onClick={()=>{
          handleClose();
          // setfOut(true);
          }} disableRipple>
          <EditIcon />
          Rename
        </MenuItem>
    
        <MenuItem onClick={handleClose} disableRipple>
          <MoreHorizIcon />
          Share
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          <ArchiveIcon />
          Download
        </MenuItem>
      </StyledMenu>
      <RenameFilePop fOut={fOut} setfOut={setfOut} fileId={data.id} caller={`file`}/>
      <SharePop pOut={pOut} setpOut={setpOut} fileId={data.id} caller={`file`}/>
        

    </div>

    
      

    
    
  )
};

export default Folder
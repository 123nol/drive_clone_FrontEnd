import React from 'react'
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
// import { alpha,styled,Menu,IconButton,MoreVertIcon,Divider,EditIcon,MenuItem,ArchiveIcon,MoreHorizIcon } from '@mui/material';

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

import { StyledMenu } from './StyledMenu';

import RenameFolderPop from './RenameFolderPop';
import SharePop from './SharePop';








const SharedFolder = ({data,getFolderFiles,curUser}) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [rOut,setrOut]=React.useState(false)
  const [pOut,setpOut]=React.useState(false);
  const opened = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const sharedDetail=data?.shared.find((detail)=>{
    
    return(detail.user==curUser.email);
  });
  const shareRenamePerm=sharedDetail.allPermission;

 
  return (
   
    <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", width:"10%", minWidth:"500px", minHeight:"50px",cursor:"pointer", background:isHovered?"lightlightgrey":"lightlightlightgrey",transition:"all 0.2s ease-in-out", padding:"15px"}} onDoubleClick={()=>{
      console.log(typeof data.id);
      getFolderFiles(data.id);
    navigate(`/home/user/Folders/${data.folderName}`) ;

    } 
  } onMouseEnter={() => setIsHovered(true)}
  onMouseLeave={() => setIsHovered(false)}>
    <div style={{width:"100px", display:"flex", justifyContent:"space-around", alignItems:"center"}}>
    <FolderOpenOutlinedIcon/>
    <h3>{data.folderName}</h3>
    </div>
    <div>
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
          setrOut(true);
          }} disableRipple disabled={!shareRenamePerm}>
          <EditIcon />
          Rename
        </MenuItem>
        
        <MenuItem onClick={()=>{
          handleClose();
          setpOut(true);
          }} disableRipple disabled={!shareRenamePerm}>
          <MoreHorizIcon />
          Share
        </MenuItem>
        <MenuItem onClick={()=>{handleClose();}} disableRipple>
          <ArchiveIcon />
          Download
        </MenuItem>
      </StyledMenu>
        

    </div>
    <RenameFolderPop folderId={data?.id} rOut={rOut} setrOut={setrOut}/>
    <SharePop pOut={pOut} setpOut={setpOut} fileId={data.id} caller="folder"/>
      

    </div>
    
  )
}

export default SharedFolder
import React from 'react'
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';


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

const Folder = ({data,getFolderFiles}) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const opened = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const StyledMenu = styled((props) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      {...props}
      
    />
  ))(({ theme }) => ({
    '& .MuiPaper-root': {
      borderRadius: 6,
      marginTop: theme.spacing(1),
      minWidth: 350,
      color:
        theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
      boxShadow:
        'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
      '& .MuiMenu-list': {
        padding: '4px 0',
      },
      '& .MuiMenuItem-root': {
        '& .MuiSvgIcon-root': {
          fontSize: 18,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5),
        },
        '&:active': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity,
          ),
        },
      },
    },
  }));
  return (
   
    <div style={{display:"flex", justifyContent:"space-between", alignItems:"center",  width:"250px", height:"fit-content",cursor:"pointer", backgroundColor:"lightgrey",transition:"all 0.2s ease-in-out", padding:"15px", position:"relative", margin:"5px",borderRadius:"10px"}} onDoubleClick={()=>{
      console.log(typeof data.id);
      getFolderFiles(data.id);
    navigate(`/home/user/Folders/${data.folderName}`) ;

    } 
  } >
    <div style={{width:"100px", display:"flex", justifyContent:"space-around", alignItems:"center",}}>
    <FolderOpenOutlinedIcon/>
    <h3>{data.folderName}</h3>
    </div>
    <div>
    <IconButton
        onClick={handleClick}
        style={{position:"absolute", right:"2px",top:"9px"}}
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
          // setfOut(true);
          }} disableRipple>
          <EditIcon />
          Rename
        </MenuItem>
        <MenuItem onClick={()=>{
          handleClose();
          // setPop(true)

        }} disableRipple>
          <ArchiveIcon />
          Move
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
        

    </div>
      

    </div>
    
  )
}

export default Folder
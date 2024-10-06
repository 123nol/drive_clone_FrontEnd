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
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import MovePop from "./MovePop"

import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';

import RenameFilePop from './RenameFilePop';

{/* <Divider sx={{ my: 0.5 }} /> */}

const File = React.memo( ({data,folders}) => {
  const [fOut,setfOut]=useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const[pop,setPop]=useState(false)
  const opened = Boolean(anchorEl);
  const handleClick = (event) => {
    event.stopPropagation(); 
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
          setfOut(true);
          }} disableRipple>
          <EditIcon />
          Rename
        </MenuItem>
        <MenuItem onClick={()=>{
          handleClose();
          setPop(true)

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
      <MovePop pop={pop} setPop={setPop} file={data.id} folders={folders}/>
      <RenameFilePop fOut={fOut} setfOut={setfOut} fileId={data.id}/>

   


    </div>
  )
});

export default File
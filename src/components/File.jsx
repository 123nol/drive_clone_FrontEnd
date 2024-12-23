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
import SharePop from './SharePop';
import axiosConfig from '../Config/AxiosConfig';

import fileDownloader from 'js-file-downloader';
import axios from 'axios';

import { StyledMenu } from './StyledMenu';

{/* <Divider sx={{ my: 0.5 }} /> */}

const File = ({data,folders,user}) => {
  const [fOut,setfOut]=useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const[pop,setPop]=useState(false)
  const[pOut,setpOut]=useState(false)
  const opened = Boolean(anchorEl);
  const fileOwner=data.ownerEmail==user.email;

  const handleDonwnload=async()=>{
    try
    {
      const res=await axios.get(data.secureUrl,{
        responseType:"blob"
      });
      fileDownloader(res.data,data.fileName);
      // await new fileDownloader({
      //   url: data.secureUrl,  // The Cloudinary secure URL for the file
      //   filename: data.fileName, // Optional: the file name for the download
      //   forceDesktopMode: true, // Ensures better compatibility for desktop downloads
      //   autoStart: true,  // Automatically starts the download
      // });




    }
    catch(err){
      console.log(err)
    }




  }



  const handleTrash=async(trashId)=>{
    try
    {const res= await axiosConfig.post("/home/user/trashFile",{"fileId":trashId})}
    catch(err){
      console.log(err)
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
        <div style={{minWidth:"30%",backgroud:"red",display:"flex", alignItems:"center",gap:"5px"}}>
          <PictureAsPdfOutlined/>
          <p >
            {data?.fileName}
          </p>
        
          
         
        </div>
        <div style={{minWidth:"10%", }} >
          {data?.fileType}
        </div>
        
        <div style={{minWidth:"10%", }} >
          {data?.lastModifiedDate.substring(0,10)}
        </div>
        <div style={{minWidth:"20%",textAlign:"center",height:"100%",display:"flex",alignItems:"center", gap:"7px"}}>
          <div style={{background:"black", borderRadius:"100%",minWidth:"10%",minHeight:"50%"}}>
              {/* image */}
          </div>
          <div>
            {fileOwner?`Me`:data?.ownerEmail}
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

        }} disableRipple 
        disabled={!fileOwner}>
          <ArchiveIcon />
          Move
        </MenuItem>
        <MenuItem onClick={()=>{
          handleClose();
          setpOut(true);
        }
      
      } disableRipple
      
      
      >
          <MoreHorizIcon />
          Share
        </MenuItem>
        <MenuItem onClick={()=>{
          handleClose();
          handleTrash(data.id);
          }} disableRipple
          disabled={!fileOwner}
          >
          <ArchiveIcon />
          Trash
        </MenuItem>
        
        <MenuItem onClick={()=>{
          handleClose();
          handleDonwnload();
          }} disableRipple>
          <ArchiveIcon />
          Download
        </MenuItem>
        
      </StyledMenu>
        

      </div>
      <MovePop pop={pop} setPop={setPop} file={data.id} folders={folders} caller={`file`}/>
      <RenameFilePop fOut={fOut} setfOut={setfOut} fileId={data.id} />
      <SharePop pOut={pOut} data={data} setpOut={setpOut} fileId={data.id} caller="file"/>

   


    </div>
  )
}

export default File
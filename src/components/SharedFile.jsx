import { useState } from 'react'
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

import { StyledMenu } from './StyledMenu';
import axios from 'axios';
import fileDownloader from "js-file-downloader"


{/* <Divider sx={{ my: 0.5 }} /> */}

const SharedFile = ({data,folders,curUser}) => {
  const [fOut,setfOut]=useState(false)
  const [anchorEl, setAnchorEl] = useState(null);
  const[pop,setPop]=useState(false)
  const[pOut,setpOut]=useState(false)
  
  const opened = Boolean(anchorEl);

  const sharedDetail=data?.shared.find((detail)=>{
    
    return(detail.user==curUser.email);
  });
  const shareRenamePerm=sharedDetail.allPermission;

  // const handleShare=()=>{
  //   if(sharedDetail.allPermission==true){
  //     setpOut(true);
  //   }
  //   else()
    

  // }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDonwnload=async()=>{
    try
    {
      const res=await axios.get(data.secureUrl,{
        responseType:"blob"
      });
      fileDownloader(res.data,data.fileName);



    }
    catch(err){
      console.log(err)
    }




  }



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
       
        <div style={{minWidth:"20%",textAlign:"center",height:"100%",display:"flex",alignItems:"center", gap:"7px"}}>
          <div style={{background:"black", borderRadius:"100%",minWidth:"10%",minHeight:"50%"}}>
              {/* image */}
          </div>
          <div>
            {data?.ownerEmail}
          </div>
        </div>
        <div style={{minWidth:"10%", }} >
          {sharedDetail?.sharedDate.substring(0,10)}
        </div>
        <div style={{width:"60px"}}>
          {Math.floor(data?.size/1000)} KBs
        </div>
        {/* <div style={{width:"fit-content",marginLeft:"100px",display:"flex",justifyContent:"center",alignItems:"center",gap:"7px"}}>
        <FolderOpenOutlinedIcon/>
            {data?.location}
          </div> */}
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
          }} disableRipple  disabled={!shareRenamePerm}>
          <EditIcon />
          Rename
        </MenuItem>
        
        <MenuItem onClick={()=>{
          handleClose();
          setpOut(true);
        }
      
      } disableRipple>
          <MoreHorizIcon disabled={!shareRenamePerm} />
          Share
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
      
      <RenameFilePop fOut={fOut} setfOut={setfOut} fileId={data.id}/>
      <SharePop pOut={pOut} setpOut={setpOut} fileId={data.id} data={data}caller="file"/>

   


    </div>
  )
}

export default SharedFile
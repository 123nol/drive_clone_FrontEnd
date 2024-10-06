import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';


import CloseIcon from '@mui/icons-material/Close';
import Drawer from '@mui/material/Drawer';

import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';



import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';

import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';



import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import FolderPop from './FolderPop';

import axiosConfig from '../Config/AxiosConfig';
import axios from 'axios';

import { Link } from 'react-router-dom';



const Navbar = React.memo(({files,setFiles,folders,setFolders}) => {
  
  const[folder,setFolder]=React.useState(false)
  const[upFile,setUpFile]=React.useState([])
  // const handleInputChange = React.useCallback((e) => {
  //   setSearchTerm(e.target.value);
  // }, []);
  
  
  const handleUpload=async (event)=>{
    const upfiles= event.target.files;//always use const to store values that have anything to do with sending or receiving request to an api INSTEAD OF A FUCNING STATE
    // if (upFile==[] ){
      
    //   console.log("empty");
    //   return
    // }
     
    

    
    const formData = new FormData(); // Create a new FormData object
   
    Array.from(upfiles).forEach((file) => {
      formData.append('file', file);
    });
    
    
    try{
      const res=await axios.post("http://localhost:8080/home/user/uploadreal",formData, {
        headers:{'Content-Type':'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        },

      })
      setFiles([...files,...res.data])
      console.log(res.status)
   
      
     

      
        // this is where we make the axios post request we send {file: e. target.value} to the post endpoint
    }
    catch(err){
      console.log(err)
    }
  

  }
  
  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
   
  });
  
  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width:'20ch'
      // [theme.breakpoints.up('sm')]: {
      //   width: '20ch',
      //   // '&:focus': {
      //   //   width: '20ch',
      //   // },
      // },
    },
  }));
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const opened = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    
    setOpen(false);
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
      minWidth: 310,
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
  const DrawerList = (
    <Box sx={{ width: 350 }} role="presentation"  >
      <IconButton onClick={toggleDrawer(false)} style={{marginLeft:"8px"}}>
        <CloseIcon/>
      </IconButton>
       <Divider />
      
      <List>

        {['Home', 'My drive', 'Shared with me'].map((text, index) => (
          <Link to={index==0?"/home/user":`/home/user/${text}`}>
            {/* when the listitems are clicked it will set the searchTerm to null so that the search term doesnt persist over diffrent pages */}
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        {['Folders', 'Trash'].map((text, index) => (
          <Link to={`/home/user/${text}`}>
          <ListItem key={text} disablePadding >
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <div style={{display:"flex", justifyContent:"center",height:"60px", alignItems:"center", marginTop:"15px"}}>
      <Button
        id="demo-customized-button"
        aria-controls={opened ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={opened ? 'true' : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<AddIcon style={{fontSize:"35px"}} />}
        style={{background:"grey", width:"60%", height:"100%", fontSize:"20px"}}
      >
        New
      </Button >
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={opened}
        onClose={handleClose}
        
      >
        <MenuItem onClick={()=>{
          handleClose()
          setFolder(true);}}  disableRipple>
          <EditIcon />
          New Folder
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        
        <MenuItem 
        disableRipple  
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}>
          <ArchiveIcon />
          Upload File
          <VisuallyHiddenInput  type="file"   
          onChange={handleUpload}
          multiple/>
        </MenuItem>
        <MenuItem onClick={()=>{
          handleClose()
           setOpen(false);}} disableRipple>
          <MoreHorizIcon />
          Upload Folder
        </MenuItem>
      </StyledMenu>
    </div>
    </Box>
  );
  
 
  
  

  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{background:"grey"}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon  />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Drive v2.
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              // value={searchTerm}
              // onChange={handleInputChange}
                
              
            />
          </Search>
        </Toolbar>
        
      </AppBar>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
      
    </Box>
    <FolderPop folder={folder} setFolder={setFolder} folders={folders} setFolders={setFolders}/>

    </>
  )
});

export default Navbar